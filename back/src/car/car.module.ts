import { Module } from '@nestjs/common';

import { CarController } from './car.controller';
import { CarService } from './car.service';
import {PrismaService} from "../core/prisma.service";

@Module({
  imports: [],
  controllers: [CarController],
  providers: [CarService, PrismaService],
  exports: [PrismaService]
})
export class CarModule {}
