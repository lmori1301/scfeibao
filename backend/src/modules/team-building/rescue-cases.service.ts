import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { RescueCase } from './entities/rescue-case.entity'
import { CreateRescueCaseDto, QueryRescueCaseDto, UpdateRescueCaseDto } from './dto/rescue-case.dto'

@Injectable()
export class RescueCasesService {
  constructor(
    @InjectRepository(RescueCase)
    private rescueCaseRepository: Repository<RescueCase>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10, query?: QueryRescueCaseDto) {
    try {
      const where = query?.title ? { title: Like(`%${query.title}%`) } : {}
      const [items, total] = await this.rescueCaseRepository.findAndCount({
        where,
        order: { rescueDate: 'DESC', createdAt: 'DESC' },
        skip: (page - 1) * pageSize,
        take: pageSize
      })
      return { items, total, page, pageSize }
    } catch (error) {
      throw new InternalServerErrorException(`查询救援案例列表失败：${error.message}`)
    }
  }

  async getOne(id: number) {
    try {
      const rescueCase = await this.rescueCaseRepository.findOne({ where: { id } })
      if (!rescueCase) {
        throw new NotFoundException(`救援案例ID ${id} 不存在`)
      }
      return rescueCase
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException(`查询救援案例失败：${error.message}`)
    }
  }

  async create(dto: CreateRescueCaseDto) {
    try {
      const entity = this.rescueCaseRepository.create({
        title: this.trimRequired(dto.title, '案例标题'),
        location: this.trimRequired(dto.location, '救援地点'),
        content: this.trimRequired(dto.content, '案例内容'),
        coverImage: dto.coverImage?.trim() || null,
        rescueDate: this.parseRescueDate(dto.rescueDate),
      })
      return await this.rescueCaseRepository.save(entity)
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      throw new InternalServerErrorException(`创建救援案例失败：${error.message}`)
    }
  }

  async update(id: number, dto: UpdateRescueCaseDto) {
    const entity = await this.getOne(id)
    try {
      // 仅更新本次提交的字段；id/createdAt 等只读字段一律不写，避免 UPDATE 误改主键
      const patch: Partial<RescueCase> = {}
      if (dto.title !== undefined) {
        patch.title = this.trimRequired(dto.title, '案例标题')
      }
      if (dto.location !== undefined) {
        patch.location = this.trimRequired(dto.location, '救援地点')
      }
      if (dto.content !== undefined) {
        patch.content = this.trimRequired(dto.content, '案例内容')
      }
      if (dto.coverImage !== undefined) {
        patch.coverImage = dto.coverImage.trim() || null
      }
      if (dto.rescueDate !== undefined) {
        patch.rescueDate = this.parseRescueDate(dto.rescueDate)
      }
      await this.rescueCaseRepository.update(id, patch)
      return await this.getOne(id)
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException(`更新救援案例失败：${error.message}`)
    }
  }

  async delete(id: number) {
    const entity = await this.getOne(id)
    try {
      await this.rescueCaseRepository.delete(id)
      return { success: true }
    } catch (error) {
      throw new InternalServerErrorException(`删除救援案例失败：${error.message}`)
    }
  }

  private trimRequired(value: string | undefined, fieldName: string): string {
    const trimmed = (value ?? '').trim()
    if (!trimmed) {
      throw new BadRequestException(`${fieldName}不能为空`)
    }
    return trimmed
  }

  /**
   * 救援日期统一按「东八区当天零点」落库。
   * 后台 date-picker 提交纯日期（YYYY-MM-DD）；若直接 new Date('2026-10-21')，JS 会按 UTC
   * 零点解析，在连接 timezone=+08:00 下写入 datetime 会变成当日 08:00，任一环节再用
   * toISOString() 截取日期就会少一天。这里显式补 +08:00 消除歧义；带时间的完整串按原值解析。
   * 历史上空日期曾以 '' 直传数据库（rescueDate 为 NOT NULL datetime，strict 模式下报 1292 → 500）。
   */
  private parseRescueDate(value?: string): Date {
    if (!value) {
      throw new BadRequestException('救援日期不能为空')
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return new Date(`${value}T00:00:00+08:00`)
    }
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) {
      throw new BadRequestException('救援日期格式不正确，应为 YYYY-MM-DD')
    }
    return parsed
  }
}
