import {Module} from '@nestjs/common';

import {FuelCardService} from './fuel_card.service';
import {FuelCardController} from './fuel_card.controller';
import {PrismaService} from "../__core/prisma.service";

@Module({
    imports: [],
    controllers: [FuelCardController],
    providers: [FuelCardService, PrismaService],
    exports: [PrismaService]
})
export class FuelCardModule {
}
