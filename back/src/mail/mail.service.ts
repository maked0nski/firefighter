import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";

import {UserType} from "../user/type";
import {configs} from "../__configs";

@Injectable()
export class MailService {
    private readonly clientAppUrl: string;

    constructor(private mailerService: MailerService) {
        this.clientAppUrl = configs.FrontEnd_APP_URL
    }

    async sendUserConfirmation(user: Partial<UserType>, verificationCode: string, template: string) {
        let urlConfirmAddress = ``;
        switch (template) {
            case 'confirmation':
                urlConfirmAddress = `${this.clientAppUrl}/auth/confirm?token=${verificationCode}`;
                break
            case 'forgotPassword':
                urlConfirmAddress = `${this.clientAppUrl}/auth/forgotPassword?token=${verificationCode}`;
                break
            default:
                throw new HttpException(
                    `Невірний або не вказаний шаблон пошти`,
                    HttpStatus.BAD_REQUEST,
                );
        }
        const templates = './' + template
        await this.mailerService.sendMail({
            to: user.email,
            from: configs.NO_REPLY_EMAIL_FROM, // override default from
            subject: 'Вітаємо на сайті Пожежного спостереження',
            template: templates, // `.hbs` extension is appended automatically
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
