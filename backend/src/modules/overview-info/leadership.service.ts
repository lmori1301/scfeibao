import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Leadership } from './entities/leadership.entity'
import {
  ImportResult,
  parseExcelRows,
  toOptionalNumber,
  toOptionalString,
} from '../../common/utils/excel-import'

@Injectable()
export class LeadershipService {
  constructor(
    @InjectRepository(Leadership)
    private leadershipRepository: Repository<Leadership>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10) {
    const [items, total] = await this.leadershipRepository.findAndCount({
      order: { sort: 'ASC', createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return { items, total, page, pageSize }
  }

  async getOne(id: number) {
    return this.leadershipRepository.findOne({ where: { id } })
  }

  async create(data: any) {
    const leadership = this.leadershipRepository.create(data)
    return this.leadershipRepository.save(leadership)
  }

  async update(id: number, data: any) {
    await this.leadershipRepository.update(id, data)
    return this.getOne(id)
  }

  async delete(id: number) {
    await this.leadershipRepository.delete(id)
    return { success: true }
  }

  async importFromExcel(buffer: Buffer): Promise<ImportResult> {
    const parsed = parseExcelRows<Leadership>(buffer, [
      { field: 'name', headers: ['姓名', 'name'], required: true },
      { field: 'position', headers: ['职位', '职务', 'position'], required: true },
      { field: 'gender', headers: ['性别', 'gender'], transform: toOptionalString },
      { field: 'nation', headers: ['民族', 'nation'], transform: toOptionalString },
      { field: 'birth', headers: ['出生年月', '出生日期', 'birth'], transform: toOptionalString },
      { field: 'education', headers: ['学历', 'education'], transform: toOptionalString },
      { field: 'political', headers: ['政治面貌', 'political'], transform: toOptionalString },
      { field: 'duty', headers: ['工作职责', '职责', 'duty'], transform: toOptionalString },
      { field: 'experience', headers: ['救援经验', '救援经验(年)', 'experience'], transform: toOptionalNumber },
      { field: 'actions', headers: ['参与行动', '参与行动(次)', 'actions'], transform: toOptionalNumber },
      { field: 'photo', headers: ['照片', '成员照片', 'photo'], transform: toOptionalString },
      { field: 'sort', headers: ['排序', 'sort'], transform: toOptionalNumber },
    ])

    const result: ImportResult = {
      total: parsed.rows.length,
      created: 0,
      updated: 0,
      failed: parsed.errors.length,
      errors: parsed.errors,
    }

    for (const item of parsed.rows) {
      try {
        const data = item.data
        const existing = await this.leadershipRepository.findOne({
          where: {
            name: String(data.name),
            position: String(data.position),
          },
        })

        if (existing) {
          Object.assign(existing, data)
          await this.leadershipRepository.save(existing)
          result.updated += 1
        } else {
          await this.leadershipRepository.save(this.leadershipRepository.create(data))
          result.created += 1
        }
      } catch (error) {
        result.failed += 1
        result.errors.push({
          row: item.rowNumber,
          message: error instanceof Error ? error.message : '导入失败',
        })
      }
    }

    return result
  }
}
