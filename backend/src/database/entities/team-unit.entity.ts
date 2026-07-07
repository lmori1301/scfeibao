import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('team_units')
export class TeamUnit extends BaseEntity {
  @Column({ length: 100, unique: true, comment: '单位名称' })
  name: string;

  @Column({ length: 150, default: '', comment: '默认点位名称' })
  pointName: string;

  @Column({ type: 'int', default: 0, comment: '默认排序' })
  sort: number;

  @Column({ type: 'tinyint', default: 1, comment: '状态：1-启用，0-禁用' })
  status: number;
}
