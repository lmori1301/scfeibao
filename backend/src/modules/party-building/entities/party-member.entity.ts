import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('party_members')
export class PartyMember {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  position: string

  @Column({ nullable: true })
  avatar: string

  @Column('text', { nullable: true })
  description: string

  @Column({ default: 0 })
  sort: number
}
