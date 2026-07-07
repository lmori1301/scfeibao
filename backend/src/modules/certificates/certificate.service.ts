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

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
  ) {}

  async create(createCertificateDto: CreateCertificateDto): Promise<Certificate> {
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
    Object.assign(certificate, updateCertificateDto);
    return await this.certificateRepository.save(certificate);
  }

  async remove(id: number): Promise<void> {
    const certificate = await this.findOne(id);
    await this.certificateRepository.softRemove(certificate);
  }

  async batchDelete(ids: number[]): Promise<void> {
    await this.certificateRepository.softDelete(ids);
  }

  async batchUpdateStatus(ids: number[], status: number): Promise<void> {
    await this.certificateRepository.update(ids, { status });
  }
}
