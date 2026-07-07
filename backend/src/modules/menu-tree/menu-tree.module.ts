import { Module } from '@nestjs/common';
import { MenuTreeController } from './menu-tree.controller';
import { MenuTreeService } from './menu-tree.service';

@Module({
  controllers: [MenuTreeController],
  providers: [MenuTreeService],
  exports: [MenuTreeService],
})
export class MenuTreeModule {}
