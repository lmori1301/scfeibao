import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBackupController } from './data-backup.controller';
import { DataBackupService } from './data-backup.service';
import { Setting } from '../settings/setting.entity';
import { OperationLogModule } from '../operation-log/operation-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Setting]), OperationLogModule],
  controllers: [DataBackupController],
  providers: [DataBackupService],
})
export class DataBackupModule {}
