import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  imageUrl: string

  @Column({ nullable: true })
  link: string

  @Column({ default: 0 })
  sort: number

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date
}
