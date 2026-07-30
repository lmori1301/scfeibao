import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '密码（6-72 字节）', example: 'ExamplePassword123!' })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ description: '用户名', example: 'user001' })
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '密码', example: 'StrongPassword123!' })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(12, { message: '注册密码长度不能少于12位' })
  password: string;

  @ApiProperty({ description: '真实姓名', example: '张三', required: false })
  @IsString()
  realName?: string;
}
