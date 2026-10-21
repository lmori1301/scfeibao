import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateRescueCaseDto {
  @ApiProperty({ description: '案例标题' })
  @IsString()
  @IsNotEmpty({ message: '案例标题不能为空' })
  title: string;

  @ApiProperty({ description: '救援地点' })
  @IsString()
  @IsNotEmpty({ message: '救援地点不能为空' })
  location: string;

  @ApiProperty({ description: '救援日期，格式 YYYY-MM-DD' })
  @IsDateString({}, { message: '救援日期不能为空' })
  rescueDate: string;

  @ApiProperty({ description: '案例内容' })
  @IsString()
  @IsNotEmpty({ message: '案例内容不能为空' })
  content: string;

  @ApiProperty({ description: '封面图片', required: false })
  @IsString()
  @IsOptional()
  coverImage?: string;
}

export class UpdateRescueCaseDto extends PartialType(CreateRescueCaseDto) {}

export class QueryRescueCaseDto extends PaginationDto {
  @ApiProperty({ description: '案例标题关键词', required: false })
  @IsString()
  @IsOptional()
  title?: string;
}
