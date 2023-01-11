import {Module} from '@nestjs/common';

import {PrismaService} from "../__core/prisma.service";
import {ClientController} from './client.controller';
import {ClientService} from './client.service';

@Module({
    controllers: [ClientController],
    providers: [ClientService, PrismaService],
    exports: [PrismaService]
})
export class ClientModule {
}
