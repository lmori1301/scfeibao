import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDateString,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateNewsDto {
  @ApiProperty({ description: '标题' })
  @IsString()
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;

  @ApiProperty({ description: '摘要', required: false })
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiProperty({ description: '内容' })
  @IsString()
  @IsNotEmpty({ message: '内容不能为空' })
  content: string;

  @ApiProperty({ description: '封面图片', required: false })
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiProperty({ description: '分类', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ description: '作者', required: false })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({ description: '状态：1-已发布，0-草稿', required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  status?: number;

  @ApiProperty({ description: '发布时间', required: false })
  @IsDateString()
  @IsOptional()
  publishedAt?: string;

  @ApiProperty({ description: '排序', required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  sort?: number;

  @ApiProperty({ description: '是否为头条：1-是，0-否', required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  isHeadline?: number;

  @ApiProperty({ description: '是否显示NEW标签：1-是，0-否', required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  isNew?: number;
}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}

export class QueryNewsDto extends PaginationDto {
  @ApiProperty({ description: '标题', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: '分类', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ description: '状态', required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(1)
  status?: number;

  @ApiProperty({ description: '关键词', required: false })
  @IsString()
  @IsOptional()
  keyword?: string;
}
