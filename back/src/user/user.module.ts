import {Module} from '@nestjs/common';

import {PrismaService} from "../__core/prisma.service";
import {UserController} from "./user.controller";
import {UserService} from './user.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, PrismaService],
    exports: [
        PrismaService,
        UserService
    ]
})
export class UserModule {
}
