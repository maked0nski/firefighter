import { Module } from '@nestjs/common';
import { ContactPersonController } from './contact_person.controller';
import { ContactPersonService } from './contact_person.service';
import {PrismaService} from "../core/prisma.service";

@Module({
  controllers: [ContactPersonController],
  providers: [ContactPersonService, PrismaService],
  exports: [PrismaService]
})
export class ContactPersonModule {}
