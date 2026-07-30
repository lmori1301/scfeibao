import { IsString, IsEmail, IsOptional, IsIn, MinLength, IsNotEmpty } from 'class-validator';

export class CreateAdminUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsIn(['active', 'disabled'])
  @IsOptional()
  status?: string;
}

export class UpdateAdminUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  role?: string;
}

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @MinLength(12)
  newPassword: string;
}

export class ForceChangePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @MinLength(12)
  newPassword: string;
}

export class ResetPasswordDto {
  @IsString()
  @MinLength(12)
  newPassword: string;
}

export class UpdateStatusDto {
  @IsIn(['active', 'disabled'])
  status: string;
}
