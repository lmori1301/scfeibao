import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  docNumber: string

  @Column({ type: 'date' })
  publishDate: Date

  @Column({ type: 'date', nullable: true })
  effectiveDate: Date

  @Column({ nullable: true })
  department: string

  @Column({ nullable: true })
  attachment: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
