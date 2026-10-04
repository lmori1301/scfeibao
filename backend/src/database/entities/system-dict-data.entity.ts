import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

/**
 * 通用数据字典（对齐 `/system/dict/data/type/{dictType}` 接口约定）。
 *
 * 队伍名称字典（dict_type = 'team_name'）不在本表维护，
 * 统一以「队伍字典」team_units 为唯一事实源，由 DictService 转发，
 * 避免同一个队伍名称在两处维护导致不一致。
 */
@Entity('system_dict_data')
export class SystemDictData extends BaseEntity {
  @Column({ name: 'dict_type', length: 64, comment: '字典类型' })
  dictType: string;

  @Column({ name: 'dict_label', length: 100, comment: '字典标签' })
  dictLabel: string;

  @Column({ name: 'dict_value', length: 100, comment: '字典值' })
  dictValue: string;

  @Column({ name: 'sort', type: 'int', default: 0, comment: '排序' })
  sort: number;

  @Column({ type: 'tinyint', default: 1, comment: '状态：1-启用，0-禁用' })
  status: number;

  @Column({ type: 'text', nullable: true, comment: '备注' })
  remark: string | null;
}
