import { Module } from '@nestjs/common';
import { ObservationController } from './observation.controller';
import { ObservationService } from './observation.service';
import {PrismaService} from "../core/prisma.service";

@Module({
  controllers: [ObservationController],
  providers: [ObservationService, PrismaService],
  exports: [PrismaService]
})
export class ObservationModule {}
