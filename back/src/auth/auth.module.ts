import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";

import {AccessTokenStrategy, RefreshTokenStrategy} from "./strategies";
import {PrismaService} from "../__core/prisma.service";

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, PrismaService],
})
export class AuthModule {
}
