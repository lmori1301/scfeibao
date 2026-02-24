import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateLocationDto {
  @ApiProperty({ description: '单位名称' })
  @IsString()
  name: string;

  @ApiProperty({ description: '地址' })
  @IsString()
  address: string;

  @ApiProperty({ description: '联系电话' })
  @IsString()
  phone: string;

  @ApiProperty({ description: '排序', required: false })
  @IsInt()
  @IsOptional()
  sort?: number;

  @ApiProperty({ description: '状态', required: false })
  @IsInt()
  @IsOptional()
  status?: number;
}

export class UpdateLocationDto {
  @ApiProperty({ description: '单位名称', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: '地址', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: '联系电话', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: '排序', required: false })
  @IsInt()
  @IsOptional()
  sort?: number;

  @ApiProperty({ description: '状态', required: false })
  @IsInt()
  @IsOptional()
  status?: number;
}

export class QueryLocationDto extends PaginationDto {
  @ApiProperty({ description: '关键词搜索', required: false })
  @IsString()
  @IsOptional()
  keyword?: string;

  @ApiProperty({ description: '状态', required: false })
  @IsInt()
  @IsOptional()
  status?: number;
}
