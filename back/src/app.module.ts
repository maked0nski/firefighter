import {MulterModule} from "@nestjs/platform-express";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {Module} from '@nestjs/common';
import {MailerModule} from "@nestjs-modules/mailer";

import {
    AuthModule, CarModule,
    ClientModule,
    ContactPersonModule, FireExtinguishersModule,
    FireHydrantModule,
    FireResistantImpregnationModule, FuelCardModule, ObservationModule, PositionModule, SimCardModule, UserModule
} from './index';
import {AccessTokenGuard} from "./__core/guards";
import {getMailConfig} from "./__configs";


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
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMailConfig,
        }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            // useClass: AccessTokenGuard,
            useClass: AccessTokenGuard,
        },
    ],
})
export class AppModule {
}
