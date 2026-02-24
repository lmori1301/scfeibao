import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDateString,
} from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreatePersonnelDto {
  @ApiProperty({ description: '姓名' })
  @IsString()
  @IsNotEmpty({ message: '姓名不能为空' })
  name: string;

  @ApiProperty({ description: '身份证号' })
  @IsString()
  @IsNotEmpty({ message: '身份证号不能为空' })
  idCard: string;

  @ApiProperty({ description: '性别', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ description: '出生日期', required: false })
  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({ description: '联系电话', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: '所属队伍', required: false })
  @IsString()
  @IsOptional()
  team?: string;

  @ApiProperty({ description: '职务', required: false })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiProperty({ description: '入队日期', required: false })
  @IsDateString()
  @IsOptional()
  joinDate?: Date;

  @ApiProperty({ description: '照片URL', required: false })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiProperty({ description: '专业技能', required: false })
  @IsString()
  @IsOptional()
  skills?: string;

  @ApiProperty({ description: '备注', required: false })
  @IsString()
  @IsOptional()
  remark?: string;

  @ApiProperty({ description: '状态：1-在职，0-离职', required: false })
  @IsInt()
  @IsOptional()
  status?: number;
}

export class UpdatePersonnelDto {
  @ApiProperty({ description: '姓名', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: '身份证号', required: false })
  @IsString()
  @IsOptional()
  idCard?: string;

  @ApiProperty({ description: '性别', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ description: '出生日期', required: false })
  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({ description: '联系电话', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: '所属队伍', required: false })
  @IsString()
  @IsOptional()
  team?: string;

  @ApiProperty({ description: '职务', required: false })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiProperty({ description: '入队日期', required: false })
  @IsDateString()
  @IsOptional()
  joinDate?: Date;

  @ApiProperty({ description: '照片URL', required: false })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiProperty({ description: '专业技能', required: false })
  @IsString()
  @IsOptional()
  skills?: string;

  @ApiProperty({ description: '备注', required: false })
  @IsString()
  @IsOptional()
  remark?: string;

  @ApiProperty({ description: '状态：1-在职，0-离职', required: false })
  @IsInt()
  @IsOptional()
  status?: number;
}

export class QueryPersonnelDto extends PaginationDto {
  @ApiProperty({ description: '所属队伍', required: false })
  @IsString()
  @IsOptional()
  team?: string;

  @ApiProperty({ description: '状态', required: false })
  @IsInt()
  @IsOptional()
  status?: number;

  @ApiProperty({ description: '关键词', required: false })
  @IsString()
  @IsOptional()
  keyword?: string;
}
