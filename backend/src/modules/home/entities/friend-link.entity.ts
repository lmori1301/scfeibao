import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('friend_links')
export class FriendLink {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100, comment: '单位名称' })
  name: string

  @Column({ length: 500, comment: '链接地址' })
  url: string

  @Column({ length: 500, nullable: true, comment: '单位logo' })
  logo: string

  @Column({ default: 0, comment: '排序' })
  sort: number

  @Column({ default: true, comment: '是否启用' })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
