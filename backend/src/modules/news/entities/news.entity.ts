import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn() // 主键自带索引，无需额外添加
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Index() // 核心：给分类字段加索引，加速列表查询
  @Column({ length: 50 })
  category: string;

  @Index() // 给发布时间加索引，加速排序
  @Column({ name: 'published_at', type: 'timestamp' })
  publishedAt: string;

  @Index() // 给创建时间加索引
  @Column({ name: 'create_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({ length: 255, nullable: true })
  cover: string;
}