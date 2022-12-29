import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {MailerModule} from "@nestjs-modules/mailer";
import {Module} from '@nestjs/common';
import {join} from "path";

import {MailService} from './mail.service';
import {ConfigService} from "@nestjs/config";


@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService)=>({
                transport: {
                    service: 'gmail',
                    secure: false,
                    auth: {
                        user: config.get("NO_REPLY_EMAIL"),
                        pass: config.get("NO_REPLY_EMAIL_PASSWORD"),
                    },
                    logger: true
                },
                // defaults: {
                //     from: configs.NO_REPLY_EMAIL_FROM,
                // },
                template: {
                    dir: join(__dirname, 'templates'),
                    adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {
}
