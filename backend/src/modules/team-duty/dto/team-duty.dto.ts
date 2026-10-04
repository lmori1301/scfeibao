import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  ValidateNested,
  ArrayMinSize,
  IsArray,
} from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

/** 单条值班记录（字段与 team_duty 表一致） */
export class TeamDutyItemDto {
  @ApiProperty({ description: '值班日期（YYYY-MM-DD）', required: false })
  @IsOptional()
  @IsDateString({}, { message: '值班日期格式不正确' })
  dutyDate?: string;

  @ApiProperty({ description: '值班干部姓名', required: false })
  @IsOptional()
  @IsString()
  dutyCadreName?: string;

  @ApiProperty({ description: '值班干部联系电话', required: false })
  @IsOptional()
  @IsString()
  dutyCadrePhone?: string;

  @ApiProperty({ description: '值班员（多人，英文逗号分隔）', required: false })
  @IsOptional()
  @IsString()
  dutyStaff?: string;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @IsString()
  remark?: string;
}

export class CreateTeamDutyDto extends TeamDutyItemDto {
  @ApiProperty({ description: '队伍名称（字典带出）' })
  @IsString()
  @IsNotEmpty({ message: '队伍名称不能为空' })
  teamName: string;

  @ApiProperty({ description: '值班年份，如 2026' })
  @IsString()
  @IsNotEmpty({ message: '值班年份不能为空' })
  dutyYear: string;

  @ApiProperty({ description: '值班干部姓名' })
  @IsString()
  @IsNotEmpty({ message: '值班干部不能为空' })
  dutyCadreName: string;

  @ApiProperty({ description: '值班员（多人，英文逗号分隔）' })
  @IsString()
  @IsNotEmpty({ message: '值班员不能为空' })
  dutyStaff: string;

  @ApiProperty({ description: '附件地址', required: false })
  @IsOptional()
  @IsString()
  attachUrl?: string;

  @ApiProperty({ description: '附件名称', required: false })
  @IsOptional()
  @IsString()
  attachName?: string;
}

export class UpdateTeamDutyDto {
  @ApiProperty({ description: '队伍名称', required: false })
  @IsOptional()
  @IsString()
  teamName?: string;

  @ApiProperty({ description: '值班年份', required: false })
  @IsOptional()
  @IsString()
  dutyYear?: string;

  @ApiProperty({ description: '值班日期（YYYY-MM-DD）', required: false })
  @IsOptional()
  @IsDateString({}, { message: '值班日期格式不正确' })
  dutyDate?: string;

  @ApiProperty({ description: '值班干部姓名', required: false })
  @IsOptional()
  @IsString()
  dutyCadreName?: string;

  @ApiProperty({ description: '值班干部联系电话', required: false })
  @IsOptional()
  @IsString()
  dutyCadrePhone?: string;

  @ApiProperty({ description: '值班员（多人，英文逗号分隔）', required: false })
  @IsOptional()
  @IsString()
  dutyStaff?: string;

  @ApiProperty({ description: '附件地址', required: false })
  @IsOptional()
  @IsString()
  attachUrl?: string;

  @ApiProperty({ description: '附件名称', required: false })
  @IsOptional()
  @IsString()
  attachName?: string;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @IsString()
  remark?: string;
}

/** 批量新增（一次提交附件解析出的全部值班行） */
export class CreateTeamDutyBatchDto {
  @ApiProperty({ description: '队伍名称（字典带出）' })
  @IsString()
  @IsNotEmpty({ message: '队伍名称不能为空' })
  teamName: string;

  @ApiProperty({ description: '值班年份，如 2026' })
  @IsString()
  @IsNotEmpty({ message: '值班年份不能为空' })
  dutyYear: string;

  @ApiProperty({ description: '附件地址', required: false })
  @IsOptional()
  @IsString()
  attachUrl?: string;

  @ApiProperty({ description: '附件名称', required: false })
  @IsOptional()
  @IsString()
  attachName?: string;

  @ApiProperty({ description: '解析出的值班行', type: [TeamDutyItemDto] })
  @IsArray()
  @ArrayMinSize(1, { message: '至少需要一条值班记录' })
  @ValidateNested({ each: true })
  @Type(() => TeamDutyItemDto)
  items: TeamDutyItemDto[];
}

export class QueryTeamDutyDto extends PaginationDto {
  @ApiProperty({ description: '队伍名称（精确匹配）', required: false })
  @IsOptional()
  @IsString()
  teamName?: string;

  @ApiProperty({ description: '值班年份（精确匹配）', required: false })
  @IsOptional()
  @IsString()
  dutyYear?: string;

  @ApiProperty({ description: '起始日期 YYYY-MM-DD', required: false })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiProperty({ description: '结束日期 YYYY-MM-DD', required: false })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiProperty({
    description: '关键词（值班干部 / 值班员 / 电话）',
    required: false,
  })
  @IsOptional()
  @IsString()
  keyword?: string;
}
