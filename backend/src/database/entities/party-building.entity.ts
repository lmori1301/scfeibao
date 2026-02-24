import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('party_building')
export class PartyBuilding extends BaseEntity {
  @Column({ length: 200, comment: '标题' })
  title: string;

  @Column({ type: 'text', nullable: true, comment: '摘要' })
  summary: string;

  @Column({ type: 'longtext', comment: '内容' })
  content: string;

  @Column({ length: 255, nullable: true, comment: '封面图片' })
  coverImage: string;

  @Column({ length: 50, nullable: true, comment: '分类' })
  category: string;

  @Column({ type: 'int', default: 0, comment: '浏览次数' })
  viewCount: number;

  @Column({ type: 'tinyint', default: 1, comment: '状态：1-已发布，0-草稿' })
  status: number;

  @Column({ type: 'datetime', nullable: true, comment: '发布时间' })
  publishedAt: Date;

  @Column({ type: 'int', default: 0, comment: '排序' })
  sort: number;
}
