import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationLogController } from './operation-log.controller';
import { OperationLogService } from './operation-log.service';
import { Setting } from '../settings/setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Setting])],
  controllers: [OperationLogController],
  providers: [OperationLogService],
  exports: [OperationLogService],
})
export class OperationLogModule {}
