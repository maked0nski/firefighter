import { Module } from '@nestjs/common';

import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import {PrismaService} from "../core/prisma.service";

@Module({
  imports: [],
  controllers: [PositionController],
  providers: [PositionService, PrismaService],
  exports: [PrismaService]
})
export class PositionModule {}
