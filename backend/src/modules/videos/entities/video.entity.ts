import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  videoUrl: string

  @Column({ nullable: true })
  coverUrl: string

  @Column({ default: 0 })
  sort: number

  @Column({ default: false })
  isTop: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
