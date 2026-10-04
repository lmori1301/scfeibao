import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemDictData } from '../../database/entities/system-dict-data.entity';
import { SystemDictController } from './system-dict.controller';
import { SystemDictService } from './system-dict.service';
import { TeamUnitModule } from '../team-units/team-unit.module';
import { TeamDutyModule } from '../team-duty/team-duty.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SystemDictData]),
    TeamUnitModule,
    TeamDutyModule,
  ],
  controllers: [SystemDictController],
  providers: [SystemDictService],
  exports: [SystemDictService],
})
export class SystemDictModule {}
