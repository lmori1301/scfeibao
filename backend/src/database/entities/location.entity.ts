import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('locations')
export class Location extends BaseEntity {
  @Column({ length: 100, comment: '单位名称' })
  name: string;

  @Column({ length: 200, comment: '地址' })
  address: string;

  @Column({ length: 20, comment: '联系电话' })
  phone: string;

  @Column({ type: 'int', default: 0, comment: '排序' })
  sort: number;

  @Column({ type: 'tinyint', default: 1, comment: '状态：1-启用，0-禁用' })
  status: number;
}
