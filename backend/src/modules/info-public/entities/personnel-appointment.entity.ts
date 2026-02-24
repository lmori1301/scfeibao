import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('personnel_appointments')
export class PersonnelAppointment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  position: string

  @Column()
  type: string

  @Column()
  appointmentDate: Date

  @CreateDateColumn()
  createdAt: Date
}
