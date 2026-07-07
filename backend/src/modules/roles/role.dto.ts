import { IsString, IsArray, IsOptional, IsIn } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  permissions?: string[];

  @IsIn(['active', 'disabled'])
  @IsOptional()
  status?: 'active' | 'disabled';
}

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  permissions?: string[];
}

export class UpdateRoleStatusDto {
  @IsIn(['active', 'disabled'])
  status: string;
}
