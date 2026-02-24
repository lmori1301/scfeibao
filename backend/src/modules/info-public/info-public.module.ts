import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InfoPublicController } from './info-public.controller'
import { InfoPublicService } from './info-public.service'
import { AppointmentsController } from './appointments.controller'
import { AppointmentsService } from './appointments.service'
import { PublicInfoController } from './public-info-admin.controller'
import { PublicInfoService } from './public-info.service'
import { Appointment } from '../appointments/entities/appointment.entity'
import { PersonnelAppointment } from './entities/personnel-appointment.entity'
import { PublicInfo } from './entities/public-info.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, PersonnelAppointment, PublicInfo])],
  controllers: [InfoPublicController, AppointmentsController, PublicInfoController],
  providers: [InfoPublicService, AppointmentsService, PublicInfoService],
})
export class InfoPublicModule {}
