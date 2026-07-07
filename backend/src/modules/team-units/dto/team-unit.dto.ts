import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateTeamUnitDto {
  @ApiProperty({ description: '单位名称' })
  @IsString()
  name: string;

  @ApiProperty({ description: '默认点位名称' })
  @IsString()
  pointName: string;

  @ApiProperty({ description: '默认排序', required: false })
  @IsOptional()
  @IsInt()
  sort?: number;

  @ApiProperty({ description: '状态', required: false })
  @IsOptional()
  @IsInt()
  status?: number;
}

export class UpdateTeamUnitDto {
  @ApiProperty({ description: '单位名称', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: '默认点位名称', required: false })
  @IsOptional()
  @IsString()
  pointName?: string;

  @ApiProperty({ description: '默认排序', required: false })
  @IsOptional()
  @IsInt()
  sort?: number;

  @ApiProperty({ description: '状态', required: false })
  @IsOptional()
  @IsInt()
  status?: number;
}

export class QueryTeamUnitDto extends PaginationDto {
  @ApiProperty({ description: '状态', required: false })
  @IsOptional()
  @IsInt()
  status?: number;
}
