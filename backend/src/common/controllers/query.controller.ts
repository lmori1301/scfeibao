import { Controller, Post, Body } from '@nestjs/common'
import { CertificateService } from '../../modules/certificates/certificate.service'
import { PersonnelService } from '../../modules/personnel/personnel.service'
import { VehicleService } from '../../modules/vehicles/vehicle.service'

@Controller('query')
export class QueryController {
  constructor(
    private readonly certificateService: CertificateService,
    private readonly personnelService: PersonnelService,
    private readonly vehicleService: VehicleService,
  ) {}

  @Post('certificate')
  queryCertificate(@Body('certificateNumber') certificateNumber: string) {
    return this.certificateService.searchByCertificateNumber(certificateNumber)
  }

  @Post('personnel')
  queryPersonnel(@Body('idCard') idCard: string) {
    return this.personnelService.searchByIdCard(idCard)
  }

  @Post('vehicle')
  queryVehicle(@Body('plateNumber') plateNumber: string) {
    return this.vehicleService.searchByPlateNumber(plateNumber)
  }
}
