import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('public_info')
export class PublicInfo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column('text')
  content: string

  @Column({ nullable: true })
  category: string

  @Column({ type: 'datetime', nullable: true })
  publishDate: Date

  @Column({ nullable: true })
  attachmentUrl: string

  @Column({ default: 0 })
  viewCount: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
