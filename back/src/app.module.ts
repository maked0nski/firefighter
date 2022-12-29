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
            isGlobal: true,
            envFilePath: `.${process.env.NONE_ENV}.env`
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
        ConfigModule.forRoot({
            isGlobal: true, // no need to import into other modules
        }),
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
