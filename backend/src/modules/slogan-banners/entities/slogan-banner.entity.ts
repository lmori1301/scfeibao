import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

/**
 * 标语横幅：显示在首页「动态要闻」板块上方的通栏横幅。
 * 与 banners 表（首页顶部大图轮播）分开，两者尺寸与用途不同。
 */
@Entity('slogan_banners')
export class SloganBanner {
  @PrimaryGeneratedColumn()
  id: number

  /** 标语文字（图片自带文字时可为空） */
  @Column({ type: 'varchar', length: 255, nullable: true, comment: '标语文字' })
  slogan: string

  /** 横幅图片地址 */
  @Column({ type: 'varchar', length: 500, nullable: false, comment: '横幅图片URL' })
  imageUrl: string

  /** 点击跳转地址，为空则不跳转 */
  @Column({ type: 'varchar', length: 500, nullable: true, comment: '跳转链接' })
  link: string

  /** 跳转方式：_blank=新标签页，_self=当前窗口 */
  @Column({ type: 'varchar', length: 10, nullable: false, default: '_self', comment: '跳转方式' })
  linkTarget: string

  /** 排序号，越小越靠前 */
  @Column({ type: 'int', nullable: false, default: 0, comment: '排序号' })
  sort: number

  /** 是否启用 */
  @Column({ type: 'tinyint', nullable: false, default: 1, comment: '是否启用' })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
