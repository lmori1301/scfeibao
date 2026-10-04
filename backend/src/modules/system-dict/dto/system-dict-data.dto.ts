import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
} from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateSystemDictDataDto {
  @ApiProperty({ description: '字典类型，如 duty_year' })
  @IsString()
  @IsNotEmpty({ message: '字典类型不能为空' })
  dictType: string;

  @ApiProperty({ description: '字典标签' })
  @IsString()
  @IsNotEmpty({ message: '字典标签不能为空' })
  dictLabel: string;

  @ApiProperty({ description: '字典值', required: false })
  @IsOptional()
  @IsString()
  dictValue?: string;

  @ApiProperty({ description: '排序', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sort?: number;

  @ApiProperty({ description: '状态：1-启用，0-禁用', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @IsString()
  remark?: string;
}

export class UpdateSystemDictDataDto {
  @ApiProperty({ description: '字典标签', required: false })
  @IsOptional()
  @IsString()
  dictLabel?: string;

  @ApiProperty({ description: '字典值', required: false })
  @IsOptional()
  @IsString()
  dictValue?: string;

  @ApiProperty({ description: '排序', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sort?: number;

  @ApiProperty({ description: '状态：1-启用，0-禁用', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @IsString()
  remark?: string;
}

export class QuerySystemDictDataDto extends PaginationDto {
  @ApiProperty({ description: '字典类型', required: false })
  @IsOptional()
  @IsString()
  dictType?: string;

  @ApiProperty({ description: '状态', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number;
}
