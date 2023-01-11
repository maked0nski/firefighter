import { Module } from '@nestjs/common';

import {PrismaService} from "../__core/prisma.service";
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  imports: [],
  controllers: [CarController],
  providers: [CarService, PrismaService],
  exports: [PrismaService]
})
export class CarModule {}
