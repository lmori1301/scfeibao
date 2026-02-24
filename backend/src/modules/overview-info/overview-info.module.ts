import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LeadershipController } from './leadership.controller'
import { LeadershipService } from './leadership.service'
import { Leadership } from './entities/leadership.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Leadership])],
  controllers: [LeadershipController],
  providers: [LeadershipService],
})
export class OverviewInfoModule {}
