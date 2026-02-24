import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity('policies')
export class Policy {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ nullable: true })
  category: string

  @Column({ type: 'text', nullable: true })
  summary: string

  @Column({ type: 'longtext' })
  content: string

  @Column({ nullable: true })
  issuingAuthority: string

  @Column({ nullable: true })
  documentNumber: string

  @Column()
  fileUrl: string

  @Column({ nullable: true })
  attachmentUrl: string

  @Column({ type: 'datetime', nullable: true })
  publishDate: Date

  @Column({ type: 'datetime', nullable: true })
  publishedAt: Date

  @Column({ default: 0 })
  viewCount: number

  @Column({ type: 'tinyint', default: 1 })
  status: number

  @Column({ default: 0 })
  sort: number

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
