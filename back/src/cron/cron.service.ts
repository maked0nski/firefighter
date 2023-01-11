import {UserService} from "../user/user.service";
import {Injectable} from '@nestjs/common';
import {Cron} from "@nestjs/schedule";

@Injectable()
export class CronService {
    constructor(
        private userService: UserService
    ) {
    }

    @Cron('0 0 * * * *') //every hour, at the start of the 0 minute
    async removeOldVerificationCode() {
        console.log("Called when the current second is 45")
        let list = await this.userService.clearNotRegistredUser();
        list?.map(item => {
            if (item.status === "pending") { // якщо прострочений токен та статус пендинг знищую юзера
                console.log(`status - pending delete user id:`,item.id)
                this.userService
                    .deleteUser(item.id)
            }
            if (item.status !== "pending") { // якщо прострочений токен та статус не пендинг очищаю данні верифікації
                console.log(`status - NOT pending Clear Verification Code user id:`,item.id)
                this.userService
                    .updateUser(item.id, {
                        verificationCode: null,
                        verificationCodeAt: null
                    })
            }
        })
        // console.log(list)
    }
}
