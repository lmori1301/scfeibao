import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Certificate } from '../../database/entities/certificate.entity';
import {
  CreateCertificateDto,
  UpdateCertificateDto,
  QueryCertificateDto,
} from './dto/certificate.dto';
import {
  PaginationDto,
  PaginatedResponseDto,
} from '../../common/dto/pagination.dto';
import {
  ImportResult,
  headerColumnIndex,
  parseExcelRows,
  toOptionalDate,
  toOptionalPhotoText,
  toOptionalString,
  toStatusNumber,
} from '../../common/utils/excel-import';
import { extractXlsxImages, pickRowImages } from '../../common/utils/xlsx-images';
import { saveImportedPhoto } from '../../common/utils/import-photo';
import { ensureUniqueValue } from '../../common/utils/unique-soft-delete';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
  ) {}

  async create(createCertificateDto: CreateCertificateDto): Promise<Certificate> {
    // certificateNumber 唯一：软删除墓碑会占住唯一键，先判重/清墓碑再写入
    await ensureUniqueValue({
      repo: this.certificateRepository,
      column: 'certificateNumber',
      value: createCertificateDto.certificateNumber,
      label: '证书编号',
    });
    const certificate = this.certificateRepository.create(createCertificateDto);
    return await this.certificateRepository.save(certificate);
  }

  async findAll(
    paginationDto: PaginationDto,
    queryDto: QueryCertificateDto,
  ): Promise<PaginatedResponseDto<Certificate>> {
    const { page, pageSize } = paginationDto;
    const { certificateType, certificateNumber, status, keyword, holderIdCard } =
      queryDto;

    const where: any = {};
    if (certificateType) where.certificateType = certificateType;
    if (certificateNumber) where.certificateNumber = Like(`%${certificateNumber}%`);
    if (status !== undefined) where.status = status;
    if (keyword) {
      where.holderName = Like(`%${keyword}%`);
    }
    if (holderIdCard) {
      where.holderIdCard = Like(`%${holderIdCard}%`);
    }

    const [items, total] = await this.certificateRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return new PaginatedResponseDto(items, total, page, pageSize);
  }

  async searchByCertificateNumber(certificateNumber: string): Promise<Certificate> {
    const certificate = await this.certificateRepository.findOne({
      where: { certificateNumber },
    });
    if (!certificate) {
      throw new NotFoundException('证书不存在');
    }
    return certificate;
  }

  async findOne(id: number): Promise<Certificate> {
    const certificate = await this.certificateRepository.findOne({
      where: { id },
    });
    if (!certificate) {
      throw new NotFoundException('证书不存在');
    }
    return certificate;
  }

  async update(
    id: number,
    updateCertificateDto: UpdateCertificateDto,
  ): Promise<Certificate> {
    const certificate = await this.findOne(id);
    if (updateCertificateDto.certificateNumber !== undefined) {
      await ensureUniqueValue({
        repo: this.certificateRepository,
        column: 'certificateNumber',
        value: updateCertificateDto.certificateNumber,
        label: '证书编号',
        excludeId: id,
      });
    }
    Object.assign(certificate, updateCertificateDto);
    return await this.certificateRepository.save(certificate);
  }

  async remove(id: number): Promise<void> {
    const certificate = await this.findOne(id);
    await this.certificateRepository.softRemove(certificate);
  }

  async batchDelete(ids: number[]): Promise<void> {
    const list = (ids || []).map(Number).filter((id) => Number.isInteger(id) && id > 0);
    if (!list.length) return;
    await this.certificateRepository.softDelete(list);
  }

  async batchUpdateStatus(ids: number[], status: number): Promise<void> {
    await this.certificateRepository.update(ids, { status });
  }

  async importFromExcel(buffer: Buffer): Promise<ImportResult> {
    const parsed = await parseExcelRows<Certificate>(buffer, [
      { field: 'certificateNumber', headers: ['证书编号', 'certificateNumber'], required: true },
      { field: 'certificateType', headers: ['证书类型', '类型', 'certificateType'], required: true },
      { field: 'certificateName', headers: ['证书名称', 'certificateName'], transform: toOptionalString },
      { field: 'holderName', headers: ['姓名', '持证人姓名', 'holderName'], required: true },
      { field: 'holderIdCard', headers: ['身份证号', '持证人身份证号', 'holderIdCard'], transform: toOptionalString },
      { field: 'issuingAuthority', headers: ['发证机构', '工作单位', 'issuingAuthority'], transform: toOptionalString },
      { field: 'issueDate', headers: ['发证日期', 'issueDate'], transform: toOptionalDate },
      { field: 'expiryDate', headers: ['有效期至', '有效期限', 'expiryDate'], transform: toOptionalDate },
      { field: 'status', headers: ['状态', '证件状态', 'status'], transform: (value) => this.toCertificateStatus(value) },
      { field: 'photoUrl', headers: ['证书照片', '照片', 'photoUrl'], transform: toOptionalPhotoText },
      { field: 'remark', headers: ['备注', 'remark'], transform: toOptionalString },
    ]);

    // Excel 里直接贴在图层的证书照片：按行归位后逐张落盘
    const photoByRow = pickRowImages(
      extractXlsxImages(buffer),
      headerColumnIndex(parsed.headers, ['证书照片', '照片', 'photoUrl']),
      parsed.rows.map((row) => row.rowNumber),
    );

    const result: ImportResult = {
      total: parsed.rows.length,
      created: 0,
      updated: 0,
      failed: parsed.errors.length,
      photos: 0,
      errors: parsed.errors,
    };

    for (const item of parsed.rows) {
      try {
        const data = item.data;
        if (!data.certificateName && data.certificateType) {
          data.certificateName = data.certificateType;
        }
        if (data.status === undefined) {
          data.status = 1;
        }

        const embedded = photoByRow.get(item.rowNumber);
        if (embedded) {
          const url = await saveImportedPhoto(embedded.buffer, embedded.mime);
          if (url) {
            data.photoUrl = url;
            result.photos = (result.photos || 0) + 1;
          }
        }

        const existing = await this.certificateRepository.findOne({
          where: { certificateNumber: String(data.certificateNumber) },
          withDeleted: true,
        });

        if (existing) {
          const wasDeleted = Boolean(existing.deletedAt);
          Object.assign(existing, data);
          await this.certificateRepository.save(existing);
          if (wasDeleted) await this.certificateRepository.restore(existing.id);
          result.updated += 1;
        } else {
          await this.certificateRepository.save(this.certificateRepository.create(data));
          result.created += 1;
        }
      } catch (error) {
        result.failed += 1;
        result.errors.push({
          row: item.rowNumber,
          message: error instanceof Error ? error.message : '导入失败',
        });
      }
    }

    return result;
  }

  /** 有效/即将过期 -> 1；过期/失效/作废 -> 0（此前「过期」被误判成有效） */
  private toCertificateStatus(value: unknown) {
    const text = String(value ?? '').trim();
    if (!text) return undefined;
    if (['0', '失效', '过期', '已过期', '作废', '注销'].includes(text)) return 0;
    if (['1', '有效', '即将过期', '正常'].includes(text)) return 1;
    return toStatusNumber(text, ['有效', '即将过期']);
  }
}
