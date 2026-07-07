import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavigationController, PublicNavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { Setting } from '../settings/setting.entity';
import { OperationLogModule } from '../operation-log/operation-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Setting]), OperationLogModule],
  controllers: [PublicNavigationController, NavigationController],
  providers: [NavigationService],
})
export class NavigationModule {}
