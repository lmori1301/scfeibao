import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Appointment } from '../appointments/entities/appointment.entity'

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10) {
    const [items, total] = await this.appointmentRepository.findAndCount({
      order: { publishDate: 'DESC', createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return { items, total, page, pageSize }
  }

  async getOne(id: number) {
    return this.appointmentRepository.findOne({ where: { id } })
  }

  async create(data: any) {
    const appointment = this.appointmentRepository.create(data)
    return this.appointmentRepository.save(appointment)
  }

  async update(id: number, data: any) {
    await this.appointmentRepository.update(id, data)
    return this.getOne(id)
  }

  async delete(id: number) {
    await this.appointmentRepository.delete(id)
    return { success: true }
  }
}
