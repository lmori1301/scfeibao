import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDate,
} from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateCertificateDto {
  @ApiProperty({ description: '证书编号' })
  @IsString()
  @IsNotEmpty({ message: '证书编号不能为空' })
  certificateNumber: string;

  @ApiProperty({ description: '证书名称' })
  @IsString()
  @IsNotEmpty({ message: '证书名称不能为空' })
  certificateName: string;

  @ApiProperty({ description: '持证人姓名' })
  @IsString()
  @IsNotEmpty({ message: '持证人姓名不能为空' })
  holderName: string;

  @ApiProperty({ description: '持证人身份证号', required: false })
  @IsString()
  @IsOptional()
  holderIdCard?: string;

  @ApiProperty({ description: '发证机构', required: false })
  @IsString()
  @IsOptional()
  issuingAuthority?: string;

  @ApiProperty({ description: '发证日期', required: false })
  @IsDate()
  @IsOptional()
  issueDate?: Date;

  @ApiProperty({ description: '有效期至', required: false })
  @IsDate()
  @IsOptional()
  expiryDate?: Date;

  @ApiProperty({ description: '证书类型', required: false })
  @IsString()
  @IsOptional()
  certificateType?: string;

  @ApiProperty({ description: '证书照片URL', required: false })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiProperty({ description: '备注', required: false })
  @IsString()
  @IsOptional()
  remark?: string;

  @ApiProperty({ description: '状态：1-有效，0-失效', required: false })
  @IsInt()
  @IsOptional()
  status?: number;
}

export class UpdateCertificateDto {
  @ApiProperty({ description: '证书编号', required: false })
  @IsString()
  @IsOptional()
  certificateNumber?: string;

  @ApiProperty({ description: '证书名称', required: false })
  @IsString()
  @IsOptional()
  certificateName?: string;

  @ApiProperty({ description: '持证人姓名', required: false })
  @IsString()
  @IsOptional()
  holderName?: string;

  @ApiProperty({ description: '持证人身份证号', required: false })
  @IsString()
  @IsOptional()
  holderIdCard?: string;

  @ApiProperty({ description: '发证机构', required: false })
  @IsString()
  @IsOptional()
  issuingAuthority?: string;

  @ApiProperty({ description: '发证日期', required: false })
  @IsDate()
  @IsOptional()
  issueDate?: Date;

  @ApiProperty({ description: '有效期至', required: false })
  @IsDate()
  @IsOptional()
  expiryDate?: Date;

  @ApiProperty({ description: '证书类型', required: false })
  @IsString()
  @IsOptional()
  certificateType?: string;

  @ApiProperty({ description: '证书照片URL', required: false })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiProperty({ description: '备注', required: false })
  @IsString()
  @IsOptional()
  remark?: string;

  @ApiProperty({ description: '状态：1-有效，0-失效', required: false })
  @IsInt()
  @IsOptional()
  status?: number;
}

export class QueryCertificateDto extends PaginationDto {
  @ApiProperty({ description: '证书类型', required: false })
  @IsString()
  @IsOptional()
  certificateType?: string;

  @ApiProperty({ description: '证书编号（模糊）', required: false })
  @IsString()
  @IsOptional()
  certificateNumber?: string;

  @ApiProperty({ description: '状态', required: false })
  @IsInt()
  @IsOptional()
  status?: number;

  @ApiProperty({ description: '关键词（持证人姓名）', required: false })
  @IsString()
  @IsOptional()
  keyword?: string;

  @ApiProperty({ description: '持证人身份证号（模糊）', required: false })
  @IsString()
  @IsOptional()
  holderIdCard?: string;
}
