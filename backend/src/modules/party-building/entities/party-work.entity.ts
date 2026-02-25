import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('party_works')
export class PartyWork {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ nullable: true })
  type: string

  @Column('text')
  content: string

  @Column({ nullable: true })
  coverImage: string

  @Column({ nullable: true })
  summary: string

  @Column({ type: 'datetime', nullable: true })
  publishDate: Date

  @Column({ nullable: true })
  status: string

  @Column({ default: 0 })
  viewCount: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
