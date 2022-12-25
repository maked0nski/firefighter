import {MailerService} from "@nestjs-modules/mailer";
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {UserType} from "../user/type";
import {configs} from "../__configs";

@Injectable()
export class MailService {
    private readonly clientAppUrl: string;
    constructor(private mailerService: MailerService) {
        this.clientAppUrl = configs.FrontEnd_APP_URL
    }

    async sendUserConfirmation(user: Partial<UserType>, verificationCode: string) {
        const urlConfirmAddress = `${this.clientAppUrl}/auth/confirm?token=${verificationCode}`;

        await this.mailerService.sendMail({
            to: user.email,
            from: configs.NO_REPLY_EMAIL_FROM, // override default from
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './confirmation', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                // name: user.name,
                name: "Шановний користувач",
                urlConfirmAddress,
            },
        })
            .catch((e) => {
                throw new HttpException(
                    `Ошибка работы почты: ${JSON.stringify(e)}`,
                    HttpStatus.UNPROCESSABLE_ENTITY,
                );
            });
    }
}
