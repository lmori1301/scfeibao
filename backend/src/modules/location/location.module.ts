import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { MapController } from './map.controller';
import { LocationService } from './location.service';
import { Location } from '../../database/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationController, MapController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
