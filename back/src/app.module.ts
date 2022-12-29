import {MulterModule} from "@nestjs/platform-express";
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {Module} from '@nestjs/common';

import {AccessTokenGuard} from "./__core/guards";
import {MailModule} from "./mail/mail.module";
import {
    AuthModule, CarModule,
    ClientModule,
    ContactPersonModule, FireExtinguishersModule,
    FireHydrantModule,
    FireResistantImpregnationModule, FuelCardModule, ObservationModule, PositionModule, SimCardModule, UserModule
} from './index';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Позволяет обратиться к env во всем приложении
            envFilePath: `.${process.env.NONE_ENV}.env` // Указываем путь до env файла
        }),
        UserModule,
        AuthModule,
        FuelCardModule,
        PositionModule,
        CarModule,
        SimCardModule,
        ClientModule,
        ContactPersonModule,
        FireExtinguishersModule,
        FireHydrantModule,
        FireResistantImpregnationModule,
        ObservationModule,
        MulterModule.register({
            dest: './files',
        }),
        MailModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AccessTokenGuard,
        },
    ],
})
export class AppModule {
}
