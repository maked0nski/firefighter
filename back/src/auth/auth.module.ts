import {JwtModule} from "@nestjs/jwt";
import {Module} from '@nestjs/common';

import {AccessTokenStrategy, RefreshTokenStrategy} from "./strategies";
import {PrismaService} from "../__core/prisma.service";
import {AuthController} from './auth.controller';
import {UserModule} from "../user/user.module";
import {MailModule} from "../mail/mail.module";
import {AuthService} from './auth.service';


@Module({
    imports: [
        JwtModule.register({}),
        UserModule,
        MailModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        PrismaService],

})
export class AuthModule {
}
