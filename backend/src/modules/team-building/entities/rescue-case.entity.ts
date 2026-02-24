import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('rescue_cases')
export class RescueCase {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column('text')
  content: string

  @Column({ nullable: true })
  coverImage: string

  @Column()
  location: string

  @Column()
  rescueDate: Date

  @CreateDateColumn()
  createdAt: Date
}
