import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 业务模块
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { NewsModule } from './modules/news/news.module';
import { PartyBuildingModule } from './modules/party-building/party-building.module';
import { TeamBuildingModule } from './modules/team-building/team-building.module';
import { InfoPublicModule } from './modules/info-public/info-public.module';
import { PolicyModule } from './modules/policies/policy.module';
import { CertificateModule } from './modules/certificates/certificate.module';
import { PersonnelModule } from './modules/personnel/personnel.module';
import { VehicleModule } from './modules/vehicles/vehicle.module';
import { AdminUserModule } from './modules/admin-users/admin-user.module';
import { RoleModule } from './modules/roles/role.module';
import { UploadModule } from './modules/upload/upload.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SettingModule } from './modules/settings/setting.module';
import { BannerModule } from './modules/banners/banner.module';
import { OverviewInfoModule } from './modules/overview-info/overview-info.module';
import { VideosModule } from './modules/videos/videos.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { LocationModule } from './modules/location/location.module';

// 全局守卫、过滤器、拦截器
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { QueryController } from './common/controllers/query.controller';

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 数据库模块
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // 临时禁用自动同步，避免实体不一致导致的迁移错误
        logging: configService.get('NODE_ENV') === 'development',
        timezone: '+08:00',
        charset: 'utf8mb4',
      }),
      inject: [ConfigService],
    }),

    // 业务模块
    AuthModule,
    HomeModule,
    NewsModule,
    PartyBuildingModule,
    TeamBuildingModule,
    InfoPublicModule,
    OverviewInfoModule,
    PolicyModule,
    CertificateModule,
    PersonnelModule,
    VehicleModule,
    AdminUserModule,
    RoleModule,
    UploadModule,
    DashboardModule,
    SettingModule,
    BannerModule,
    VideosModule,
    AppointmentsModule,
    LocationModule,
  ],
  controllers: [AppController, QueryController],
  providers: [
    AppService,
    // 全局守卫
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // 全局过滤器
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // 全局拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
