import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('vehicles')
export class Vehicle extends BaseEntity {
  @Column({ length: 20, unique: true, comment: '车牌号' })
  plateNumber: string;

  @Column({ length: 40, nullable: true, comment: '车辆编号' })
  vehicleNo: string;

  @Column({ length: 50, comment: '车辆类型' })
  vehicleType: string;

  @Column({ length: 50, nullable: true, comment: '品牌型号' })
  brandModel: string;

  @Column({ length: 64, nullable: true, comment: '发动机号' })
  engineNumber: string;

  @Column({ length: 64, nullable: true, comment: '车架号码' })
  chassisNumber: string;

  @Column({ length: 50, nullable: true, comment: '车辆颜色' })
  color: string;

  @Column({ type: 'date', nullable: true, comment: '购置日期' })
  purchaseDate: Date;

  @Column({ type: 'date', nullable: true, comment: '发证日期' })
  issueDate: Date;

  @Column({ type: 'date', nullable: true, comment: '有效期限' })
  validityDate: Date;

  @Column({ length: 100, nullable: true, comment: '所属队伍' })
  team: string;

  @Column({ length: 50, nullable: true, comment: '责任人' })
  responsiblePerson: string;

  @Column({ length: 20, nullable: true, comment: '联系电话' })
  phone: string;

  @Column({ type: 'text', nullable: true, comment: '车辆配置' })
  configuration: string;

  @Column({ type: 'text', nullable: true, comment: '车辆照片：JSON 数组 URL 或单张 URL 兼容' })
  photoUrl: string;

  @Column({ type: 'date', nullable: true, comment: '最后保养日期' })
  lastMaintenanceDate: Date;

  @Column({ type: 'date', nullable: true, comment: '下次保养日期' })
  nextMaintenanceDate: Date;

  @Column({ type: 'text', nullable: true, comment: '备注' })
  remark: string;

  @Column({ type: 'tinyint', default: 1, comment: '状态：1-正常，0-停用' })
  status: number;
}
