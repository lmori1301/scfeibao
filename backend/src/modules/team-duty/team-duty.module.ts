import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamDuty } from '../../database/entities/team-duty.entity';
import { TeamDutyController } from './team-duty.controller';
import { TeamDutyService } from './team-duty.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamDuty])],
  controllers: [TeamDutyController],
  providers: [TeamDutyService],
  exports: [TeamDutyService],
})
export class TeamDutyModule {}
