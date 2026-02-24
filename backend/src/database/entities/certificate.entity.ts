import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('certificates')
export class Certificate extends BaseEntity {
  @Column({ length: 100, unique: true, comment: '证书编号' })
  certificateNumber: string;

  @Column({ length: 100, comment: '证书名称' })
  certificateName: string;

  @Column({ length: 50, comment: '持证人姓名' })
  holderName: string;

  @Column({ length: 20, nullable: true, comment: '持证人身份证号' })
  holderIdCard: string;

  @Column({ length: 100, nullable: true, comment: '发证机构' })
  issuingAuthority: string;

  @Column({ type: 'date', nullable: true, comment: '发证日期' })
  issueDate: Date;

  @Column({ type: 'date', nullable: true, comment: '有效期至' })
  expiryDate: Date;

  @Column({ length: 50, nullable: true, comment: '证书类型' })
  certificateType: string;

  @Column({ type: 'text', nullable: true, comment: '备注' })
  remark: string;

  @Column({ type: 'tinyint', default: 1, comment: '状态：1-有效，0-失效' })
  status: number;
}
