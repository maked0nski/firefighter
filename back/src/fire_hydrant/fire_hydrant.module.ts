import { Module } from '@nestjs/common';

import { FireHydrantController } from './fire_hydrant.controller';
import { FireHydrantService } from './fire_hydrant.service';
import {PrismaService} from "../__core/prisma.service";

@Module({
  controllers: [FireHydrantController],
  providers: [FireHydrantService, PrismaService],
  exports: [PrismaService]
})
export class FireHydrantModule {}
