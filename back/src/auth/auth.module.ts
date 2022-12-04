import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";

import {AtStrategy, RtStrategy} from "./strategies";
import {PrismaService} from "../core/prisma.service";

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy, PrismaService],
})
export class AuthModule {
}
