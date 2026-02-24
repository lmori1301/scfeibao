import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDateString,
} from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ description: '车牌号' })
  @IsString()
  @IsNotEmpty({ message: '车牌号不能为空' })
  plateNumber: string;

  @ApiProperty({ description: '车辆类型' })
  @IsString()
  @IsNotEmpty({ message: '车辆类型不能为空' })
  vehicleType: string;

  @ApiProperty({ description: '品牌型号', required: false })
  @IsString()
  @IsOptional()
  brandModel?: string;

  @ApiProperty({ description: '车辆颜色', required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ description: '购置日期', required: false })
  @IsDateString()
  @IsOptional()
  purchaseDate?: Date;

  @ApiProperty({ description: '所属队伍', required: false })
  @IsString()
  @IsOptional()
  team?: string;

  @ApiProperty({ description: '责任人', required: false })
  @IsString()
  @IsOptional()
  responsiblePerson?: string;

  @ApiProperty({ description: '联系电话', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: '车辆配置', required: false })
  @IsString()
  @IsOptional()
  configuration?: string;

  @ApiProperty({ description: '车辆照片URL', required: false })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiProperty({ description: '最后保养日期', required: false })
  @IsDateString()
  @IsOptional()
  lastMaintenanceDate?: Date;

  @ApiProperty({ description: '下次保养日期', required: false })
  @IsDateString()
  @IsOptional()
  nextMaintenanceDate?: Date;

  @ApiProperty({ description: '备注', required: false })
  @IsString()
  @IsOptional()
  remark?: string;

  @ApiProperty({ description: '状态：1-正常，0-停用', required: false })
  @IsInt()
  @IsOptional()
  status?: number;
}

export class UpdateVehicleDto {
  @ApiProperty({ description: '车牌号', required: false })
  @IsString()
  @IsOptional()
  plateNumber?: string;

  @ApiProperty({ description: '车辆类型', required: false })
  @IsString()
  @IsOptional()
  vehicleType?: string;

  @ApiProperty({ description: '品牌型号', required: false })
  @IsString()
  @IsOptional()
  brandModel?: string;

  @ApiProperty({ description: '车辆颜色', required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ description: '购置日期', required: false })
  @IsDateString()
  @IsOptional()
  purchaseDate?: Date;

  @ApiProperty({ description: '所属队伍', required: false })
  @IsString()
  @IsOptional()
  team?: string;

  @ApiProperty({ description: '责任人', required: false })
  @IsString()
  @IsOptional()
  responsiblePerson?: string;

  @ApiProperty({ description: '联系电话', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: '车辆配置', required: false })
  @IsString()
  @IsOptional()
  configuration?: string;

  @ApiProperty({ description: '车辆照片URL', required: false })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiProperty({ description: '最后保养日期', required: false })
  @IsDateString()
  @IsOptional()
  lastMaintenanceDate?: Date;

  @ApiProperty({ description: '下次保养日期', required: false })
  @IsDateString()
  @IsOptional()
  nextMaintenanceDate?: Date;

  @ApiProperty({ description: '备注', required: false })
  @IsString()
  @IsOptional()
  remark?: string;

  @ApiProperty({ description: '状态：1-正常，0-停用', required: false })
  @IsInt()
  @IsOptional()
  status?: number;
}

export class QueryVehicleDto {
  @ApiProperty({ description: '车辆类型', required: false })
  @IsString()
  @IsOptional()
  vehicleType?: string;

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
