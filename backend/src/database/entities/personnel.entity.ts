import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('personnel')
export class Personnel extends BaseEntity {
  @Column({ length: 32, nullable: true, comment: '人员业务编号' })
  personnelCode: string;

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

  @Column({ length: 100, nullable: true, comment: '电子邮箱' })
  email: string;

  @Column({ length: 100, nullable: true, comment: '所属队伍' })
  team: string;

  @Column({ length: 100, nullable: true, comment: '工作单位' })
  workUnit: string;

  @Column({ length: 50, nullable: true, comment: '职务' })
  position: string;

  @Column({ type: 'date', nullable: true, comment: '入队日期' })
  joinDate: Date;

  @Column({ type: 'text', nullable: true, comment: '人员照片：JSON 数组 URL 或单张 URL 兼容' })
  photoUrl: string;

  @Column({ type: 'text', nullable: true, comment: '专业技能' })
  skills: string;

  @Column({ type: 'text', nullable: true, comment: '备注' })
  remark: string;

  @Column({ type: 'int', default: 0, comment: '出勤次数' })
  taskCount: number;

  @Column({ type: 'int', default: 0, comment: '培训时长(小时)' })
  trainingHours: number;

  @Column({ type: 'tinyint', default: 1, comment: '状态：1-在职，0-离职' })
  status: number;

  @Column({ type: 'tinyint', default: 1, comment: '审核状态 0待审核 1已通过 2已拒绝' })
  auditStatus: number;
}
