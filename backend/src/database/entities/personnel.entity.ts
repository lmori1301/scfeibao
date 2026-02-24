import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('personnel')
export class Personnel extends BaseEntity {
  @Column({ length: 50, comment: '姓名' })
  name: string;

  @Column({ length: 20, unique: true, comment: '身份证号' })
  idCard: string;

  @Column({ length: 10, nullable: true, comment: '性别' })
  gender: string;

  @Column({ type: 'date', nullable: true, comment: '出生日期' })
  birthDate: Date;

  @Column({ length: 20, nullable: true, comment: '联系电话' })
  phone: string;

  @Column({ length: 100, nullable: true, comment: '所属队伍' })
  team: string;

  @Column({ length: 50, nullable: true, comment: '职务' })
  position: string;

  @Column({ type: 'date', nullable: true, comment: '入队日期' })
  joinDate: Date;

  @Column({ length: 255, nullable: true, comment: '照片URL' })
  photoUrl: string;

  @Column({ type: 'text', nullable: true, comment: '专业技能' })
  skills: string;

  @Column({ type: 'text', nullable: true, comment: '备注' })
  remark: string;

  @Column({ type: 'tinyint', default: 1, comment: '状态：1-在职，0-离职' })
  status: number;
}
