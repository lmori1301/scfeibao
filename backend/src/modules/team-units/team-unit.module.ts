import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamUnit } from '../../database/entities/team-unit.entity';
import { TeamUnitController } from './team-unit.controller';
import { TeamUnitService } from './team-unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamUnit])],
  controllers: [TeamUnitController],
  providers: [TeamUnitService],
  exports: [TeamUnitService],
})
export class TeamUnitModule {}
