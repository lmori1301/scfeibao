import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { News } from '../../database/entities/news.entity';
import { Certificate } from '../../database/entities/certificate.entity';
import { Vehicle } from '../../database/entities/vehicle.entity';
import { Personnel } from '../../database/entities/personnel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News, Certificate, Vehicle, Personnel])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
