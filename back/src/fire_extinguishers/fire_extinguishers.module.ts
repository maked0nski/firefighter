import { Module } from '@nestjs/common';

import { FireExtinguishersController } from './fire_extinguishers.controller';
import { FireExtinguishersService } from './fire_extinguishers.service';
import {PrismaService} from "../__core/prisma.service";

@Module({
  controllers: [FireExtinguishersController],
  providers: [FireExtinguishersService, PrismaService],
  exports: [PrismaService]
})
export class FireExtinguishersModule {}
