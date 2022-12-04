import { Module } from '@nestjs/common';

import {PrismaService} from "../core/prisma.service";
import { FireHydrantController } from './fire_hydrant.controller';
import { FireHydrantService } from './fire_hydrant.service';

@Module({
  controllers: [FireHydrantController],
  providers: [FireHydrantService, PrismaService],
  exports: [PrismaService]
})
export class FireHydrantModule {}
