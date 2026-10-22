import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';

/**
 * 「唯一列 + 软删除」通用判重。
 *
 * 背景：实体唯一列（如 team_units.name）在软删除后行仍在，唯一索引依然占用，
 * 重新新增同值会触发 ER_DUP_ENTRY → 未捕获 → 500「服务器内部错误」。
 *
 * 行为：
 * - 同值记录仍存活 → 抛 ConflictException（HttpExceptionFilter 会透出 message）
 * - 同值记录已被软删除（墓碑行）→ 物理删除墓碑、释放唯一键，允许本次写入
 *
 * 注意：column 必须是调用点写死的实体属性名（非用户输入），无注入风险。
 * 判重与写入之间存在极小的并发窗口，唯一索引仍是最终兜底。
 */
export async function ensureUniqueValue<T extends BaseEntity>(opts: {
  repo: Repository<T>;
  column: string;
  value: unknown;
  label: string;
  excludeId?: number;
}): Promise<void> {
  const { repo, column, value, label, excludeId } = opts;
  if (value === undefined || value === null || `${value}`.trim() === '') {
    return;
  }

  const qb = repo
    .createQueryBuilder('t')
    .withDeleted()
    .where(`t.${column} = :__v`, { __v: value });
  if (excludeId !== undefined) {
    qb.andWhere('t.id != :__excludeId', { __excludeId: excludeId });
  }
  const dup = await qb.getOne();
  if (!dup) return;

  if (dup.deletedAt) {
    // 软删除墓碑占住唯一键：物理删除，让业务语义上的"重新新增"可行
    await repo.delete(dup.id);
    return;
  }
  throw new ConflictException(`${label}已存在`);
}
