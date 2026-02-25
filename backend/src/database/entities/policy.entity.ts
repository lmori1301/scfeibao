import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('policies')
export class Policy extends BaseEntity {
  @Column({ length: 200, comment: '标题' })
  title: string;

  @Column({ type: 'text', nullable: true, comment: '摘要' })
  summary: string;

  @Column({ type: 'longtext', comment: '内容' })
  content: string;

  @Column({ length: 50, nullable: true, comment: '分类' })
  category: string;

  @Column({ length: 100, nullable: true, comment: '发文机关' })
  issuingAuthority: string;

  @Column({ length: 50, nullable: true, comment: '文号' })
  documentNumber: string;

  @Column({ length: 255, nullable: true, comment: '附件URL' })
  attachmentUrl: string;

  @Column({ type: 'int', default: 0, comment: '浏览次数' })
  viewCount: number;

  @Column({ type: 'tinyint', default: 1, comment: '状态：1-已发布，0-草稿' })
  status: number;

  @Column({ type: 'datetime', nullable: true, comment: '发布时间' })
  publishedAt: Date;

  @Column({ type: 'date', nullable: true, comment: '生效日期' })
  effectiveDate: Date;

  @Column({ type: 'date', nullable: true, comment: '失效日期' })
  expiryDate: Date;

  @Column({ type: 'int', default: 0, comment: '排序' })
  sort: number;
}
