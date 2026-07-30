import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ForceChangePasswordDto } from '../admin-users/admin-user.dto';
import { AllowPasswordChangePending } from '../../common/decorators/allow-password-change-pending.decorator';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @AllowPasswordChangePending()
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取当前用户信息' })
  async getProfile(@CurrentUser() user: any) {
    return this.authService.validateUser(user.id);
  }

  @Post('change-password')
  @AllowPasswordChangePending()
  @ApiBearerAuth()
  @ApiOperation({ summary: '当前登录用户修改密码' })
  async changePassword(
    @CurrentUser() user: any,
    @Body() dto: ForceChangePasswordDto,
  ) {
    return this.authService.changePassword(user.id, dto);
  }
}
