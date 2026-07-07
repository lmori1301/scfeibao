import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, IsOptional, IsInt, IsNumber } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

const toCoordinateNumber = ({ value }: { value: unknown }) => {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : value;
};

export class CreateLocationDto {
  @ApiProperty({ description: '单位名称' })
  @IsString()
  name: string;

  @ApiProperty({ description: '点位名称' })
  @IsString()
  pointName: string;

  @ApiProperty({ description: '地址' })
  @IsString()
  address: string;

  @ApiProperty({ description: '联系电话' })
  @IsString()
  phone: string;

  @ApiProperty({ description: '经度' })
  @Transform(({ value, obj }) =>
    value !== undefined && value !== null && value !== ''
      ? toCoordinateNumber({ value })
      : toCoordinateNumber({ value: obj?.lng }),
  )
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({ description: '纬度' })
  @Transform(({ value, obj }) =>
    value !== undefined && value !== null && value !== ''
      ? toCoordinateNumber({ value })
      : toCoordinateNumber({ value: obj?.lat }),
  )
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({ description: '经度别名（lng）' })
  @Transform(({ value, obj }) =>
    value !== undefined && value !== null && value !== ''
      ? toCoordinateNumber({ value })
      : toCoordinateNumber({ value: obj?.longitude }),
  )
  @IsOptional()
  @IsNumber()
  lng?: number;

  @ApiPropertyOptional({ description: '纬度别名（lat）' })
  @Transform(({ value, obj }) =>
    value !== undefined && value !== null && value !== ''
      ? toCoordinateNumber({ value })
      : toCoordinateNumber({ value: obj?.latitude }),
  )
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiProperty({ description: '地图缩放级别', required: false })
  @IsInt()
  @IsOptional()
  zoom?: number;

  @ApiProperty({ description: '排序', required: false })
  @IsInt()
  @IsOptional()
  sort?: number;

  @ApiProperty({ description: '状态', required: false })
  @IsInt()
  @IsOptional()
  status?: number;
}

export class ResolveLocationCoordinateDto {
  @ApiProperty({ description: '单位名称', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: '点位名称', required: false })
  @IsString()
  @IsOptional()
  pointName?: string;

  @ApiProperty({ description: '详细地址' })
  @IsString()
  address: string;
}

export class UpdateLocationDto {
  @ApiProperty({ description: '单位名称', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: '点位名称', required: false })
  @IsString()
  @IsOptional()
  pointName?: string;

  @ApiProperty({ description: '地址', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: '联系电话', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: '经度', required: false })
  @Transform(({ value, obj }) =>
    value !== undefined && value !== null && value !== ''
      ? toCoordinateNumber({ value })
      : toCoordinateNumber({ value: obj?.lng }),
  )
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({ description: '纬度', required: false })
  @Transform(({ value, obj }) =>
    value !== undefined && value !== null && value !== ''
      ? toCoordinateNumber({ value })
      : toCoordinateNumber({ value: obj?.lat }),
  )
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({ description: '经度别名（lng）', required: false })
  @Transform(({ value, obj }) =>
    value !== undefined && value !== null && value !== ''
      ? toCoordinateNumber({ value })
      : toCoordinateNumber({ value: obj?.longitude }),
  )
  @IsNumber()
  @IsOptional()
  lng?: number;

  @ApiPropertyOptional({ description: '纬度别名（lat）', required: false })
  @Transform(({ value, obj }) =>
    value !== undefined && value !== null && value !== ''
      ? toCoordinateNumber({ value })
      : toCoordinateNumber({ value: obj?.latitude }),
  )
  @IsNumber()
  @IsOptional()
  lat?: number;

  @ApiProperty({ description: '地图缩放级别', required: false })
  @IsInt()
  @IsOptional()
  zoom?: number;

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
