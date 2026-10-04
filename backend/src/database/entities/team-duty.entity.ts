import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

/**
 * 队伍值班主表。
 *
 * 字段与需求文档一一对应：
 * - team_name          队伍名称（字典/队伍字典带出）
 * - duty_year          值班年份
 * - duty_date          值班日期（一条记录 = 一天）
 * - duty_cadre_name    值班干部姓名
 * - duty_cadre_phone   值班干部联系电话
 * - duty_staff         值班员（多人，英文逗号分隔）
 * - attach_url         附件地址（上传的值班表文件）
 * - attach_name        附件名称
 * - remark             备注
 * - create_by          创建人
 *
 * 创建时间复用 BaseEntity.created_at（需求中的 create_time），
 * 逻辑删除复用 BaseEntity.deleted_at（需求中的 del_flag）。
 */
@Entity('team_duty')
export class TeamDuty extends BaseEntity {
  @Column({ name: 'team_name', length: 100, comment: '队伍名称' })
  teamName: string;

  @Column({ name: 'duty_year', length: 10, comment: '值班年份' })
  dutyYear: string;

  @Column({
    name: 'duty_date',
    type: 'date',
    nullable: true,
    comment: '值班日期',
  })
  dutyDate: Date | null;

  @Column({
    name: 'duty_cadre_name',
    length: 50,
    nullable: true,
    comment: '值班干部姓名',
  })
  dutyCadreName: string | null;

  @Column({
    name: 'duty_cadre_phone',
    length: 30,
    nullable: true,
    comment: '值班干部联系电话',
  })
  dutyCadrePhone: string | null;

  @Column({
    name: 'duty_staff',
    type: 'text',
    nullable: true,
    comment: '值班员（多人，英文逗号分隔）',
  })
  dutyStaff: string | null;

  @Column({
    name: 'attach_url',
    type: 'varchar',
    length: 500,
    nullable: true,
    comment: '附件文件地址',
  })
  attachUrl: string | null;

  @Column({
    name: 'attach_name',
    length: 255,
    nullable: true,
    comment: '附件名称',
  })
  attachName: string | null;

  @Column({ type: 'text', nullable: true, comment: '备注' })
  remark: string | null;

  @Column({ name: 'create_by', length: 64, nullable: true, comment: '创建人' })
  createBy: string | null;
}
