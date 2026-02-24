import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PersonnelAppointment } from './entities/personnel-appointment.entity'

@Injectable()
export class InfoPublicService {
  constructor(
    @InjectRepository(PersonnelAppointment)
    private appointmentRepository: Repository<PersonnelAppointment>,
  ) {}

  async getPersonnel() {
    return this.appointmentRepository.find({
      order: { appointmentDate: 'DESC' }
    })
  }
}
