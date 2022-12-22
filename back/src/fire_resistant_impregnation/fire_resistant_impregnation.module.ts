import { Module } from '@nestjs/common';
import { FireResistantImpregnationController } from './fire_resistant_impregnation.controller';
import { FireResistantImpregnationService } from './fire_resistant_impregnation.service';
import {PrismaService} from "../__core/prisma.service";

@Module({
  controllers: [FireResistantImpregnationController],
  providers: [FireResistantImpregnationService, PrismaService],
  exports: [PrismaService]
})
export class FireResistantImpregnationModule {}
