import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('team_showcase')
export class TeamShowcase {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ nullable: true })
  type: string

  @Column({ nullable: true })
  imageUrl: string

  @Column({ type: 'mediumtext', nullable: true })
  description: string

  @Column({ default: 0 })
  sort: number

  @Column({ default: '显示' })
  status: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
