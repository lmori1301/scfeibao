import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('party_works')
export class PartyWork {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column('text')
  content: string

  @Column({ nullable: true })
  coverImage: string

  @Column({ default: 0 })
  viewCount: number

  @CreateDateColumn()
  createdAt: Date
}
