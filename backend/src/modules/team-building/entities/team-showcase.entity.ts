import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('team_showcase')
export class TeamShowcase {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  imageUrl: string

  @Column({ nullable: true })
  description: string

  @Column({ default: 0 })
  sort: number
}
