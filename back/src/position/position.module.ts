import { Module } from '@nestjs/common';

import { PositionController } from './position.controller';
import {PrismaService} from "../__core/prisma.service";
import { PositionService } from './position.service';

@Module({
  imports: [],
  controllers: [PositionController],
  providers: [PositionService, PrismaService],
  exports: [PrismaService]
})
export class PositionModule {}
