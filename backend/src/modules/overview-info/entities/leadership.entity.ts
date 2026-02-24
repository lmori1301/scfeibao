import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('leadership')
export class Leadership {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  position: string

  @Column({ nullable: true })
  gender: string

  @Column({ nullable: true })
  nation: string

  @Column({ nullable: true })
  birth: string

  @Column({ nullable: true })
  education: string

  @Column({ nullable: true })
  political: string

  @Column({ nullable: true })
  duty: string

  @Column({ default: 0 })
  experience: number

  @Column({ default: 0 })
  actions: number

  @Column({ nullable: true })
  photo: string

  @Column({ default: 0 })
  sort: number

  @CreateDateColumn()
  createdAt: Date
}
