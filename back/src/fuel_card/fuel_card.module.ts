import {Module} from '@nestjs/common';

import {FuelCardController} from './fuel_card.controller';
import {PrismaService} from "../__core/prisma.service";
import {FuelCardService} from './fuel_card.service';

@Module({
    imports: [],
    controllers: [FuelCardController],
    providers: [FuelCardService, PrismaService],
    exports: [PrismaService]
})
export class FuelCardModule {
}
