import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    MethodNotAllowedException,
} from '@nestjs/common';
import {SignOptions} from 'jsonwebtoken';
import {JwtService} from "@nestjs/jwt";
import moment = require('moment');
import * as bcrypt from 'bcrypt';

import {AuthUserDto, ChangePasswordDto, ForgotPasswordDto} from "./dto";
import {PrismaService} from "../__core/prisma.service";
import {MailService} from "../mail/mail.service";
import {UserService} from "../user/user.service";
import {JwtPayload, Tokens} from "./types";
import {Exception} from "../__exceptions";
import {hashPassword} from "../__utils";
import {StatusEnum} from "../user/enum";
import {UserType} from "../user/type";
import {configs} from "../__configs";
import * as process from "process";


@Injectable()
export class AuthService {
    private readonly clientAppUrl: string;

    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
        private userService: UserService,
        private mailService: MailService,
    ) {
        this.clientAppUrl = configs.FrontEnd_APP_URL
    }

    async generateToken(data, options?: SignOptions): Promise<string> {
        return this.jwtService.signAsync(data, options);
    }

    async signUp(userDto: AuthUserDto): Promise<boolean> {  // створення користувача
        const foundUser = await this.prismaService.user     // шукаємо з вказатим емайлом
            .findUnique({
                where: {
                    email: userDto.email
                }
            });
        if (!foundUser) {                                               // якщо нема користувача з даною поштою
            const password = await hashPassword(userDto.password)       //хешуєм пароль
            const user = await this.prismaService.user          //створюємо користувача
                .create({
                    data: {
                        email: userDto.email,
                        password,
                    }
                })
            await this.sendEmail(user, "confirmation");                  // відправляємо підтвердження на почту
            return true
        }
        throw new ForbiddenException(Exception.EMAIL_EXISTS)
    }

    async sendEmail(user: Partial<UserType>, templations: string) {

        const verificationCodeAt = moment()                 // срок життя токена підтвердження емайла
            .add(1, 'day')
            .toISOString();

        const option = {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: 60 * 60 * 24 // 24 hours

        }

        const tokenPayload = {
            id: user.id,
            status: user.status,
            role: user.role
        }

        const verificationCode = await this.generateToken(tokenPayload, option);

        await this.userService.updateUser(user.id, {verificationCode, verificationCodeAt});
        return await this.mailService.sendUserConfirmation(user, verificationCode, templations)

    }

    async confirm(token: string): Promise<UserType> {
        const userFromBD = await this.verifyToken(token);

        if (userFromBD && userFromBD.status === StatusEnum.pending) {

            return this.userService.updateUser(userFromBD.id, {
                status: StatusEnum.active,
                verificationCode: null,
                verificationCodeAt: null
            })
        }
        throw new BadRequestException('Confirmation error');
    }

    async verifyToken(token): Promise<any> {
        const option = {
            secret: process.env.ACCESS_TOKEN_SECRET,
        }
        try {
            let data = this.jwtService.verify(token, option);
            const userFromBD = await this.prismaService.user
                .findUnique({
                    where: {
                        id: data?.id
                    }
                })
            if (userFromBD && moment().isBefore(userFromBD.verificationCodeAt)) {   //якщо протермінований код заново вислати
                return userFromBD
            }
        } catch (error) {
            return false
        }
    }

    async registration(userDto: AuthUserDto): Promise<Tokens> {

        const user = await this.prismaService.user
            .create({
                data: {
                    email: userDto.email,
                    password: await hashPassword(userDto.password),
                },
            })
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException('Credentials incorrect');
                    }
                }
                throw error;
            })
        const tokens = await this.createTokens(user.id, user.email, user.role);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }

    async login(userDto: AuthUserDto): Promise<Tokens> {

        const user = await this.prismaService.user.findUnique({
            where: {
                email: userDto.email
            }
        })
        if (user && await bcrypt.compare(userDto.password, user?.password)) {
            if (user.status !== StatusEnum.active) {
                throw new MethodNotAllowedException(); // Accaunt is not active
            }
            const tokens = await this.createTokens(user.id, user.email, user.role);
            await this.updateRtHash(user.id, tokens.refresh_token);
            return tokens;
        }

        throw  new ForbiddenException("Access Denied");


    }

    async logout(userId: number): Promise<boolean> {
        await this.prismaService.user
            .update({
                where: {
                    id: userId,
                },
                data: {

                    refresh_token: null
                }
            })
        return true;
    }

    async refreshTokens(userId: number, rt: string): Promise<Tokens> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user || !user.refresh_token) throw new ForbiddenException("Access Denied");

        const rtMatches = await bcrypt.compare(user.refresh_token, rt);
        if (!rtMatches) throw new ForbiddenException("Access Denied");

        const tokens = await this.createTokens(user.id, user.email, user.role);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }

    async updateRtHash(userId: number, rt: string): Promise<void> {

        const refresh_token = await hashPassword(rt)
        await this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                refresh_token: refresh_token,
            }
        })
    }

    async createTokens(userId: number, email: string, role: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            id: userId,
            email: email,
            role: role
        };
        const optionAT = {
            secret: configs.ACCESS_TOKEN_SECRET,
            expiresIn: configs.ACCESS_TOKEN_EXPIRES,
            // algorithm: 'RS256',
        };
        const optionRT = {
            secret: configs.REFRESH_TOKEN_SECRET,
            expiresIn: configs.REFRESH_TOKEN_EXPIRES,
            // algorithm: 'RS256',
        }

        const [at, rt] = await Promise.all([
            this.generateToken(jwtPayload, optionAT),
            this.generateToken(jwtPayload, optionRT)
        ]);
        return {
            access_token: at,
            refresh_token: rt
        }

    }

    async getRole(userId: number): Promise<string> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        });

        return user.role
    }

    async forgotPassword({email}: ForgotPasswordDto): Promise<void> {
        const foundUser = await this.userService.getByEmail(email);
        if (!foundUser) {
            throw new BadRequestException('Invalid email');
        }

        return await this.sendEmail(foundUser, 'forgotPassword') //формує посилання на фронт з токеном

    }

    async changePassword(id: number, changePasswordDto: ChangePasswordDto): Promise<boolean> {
        const password = await hashPassword(changePasswordDto.password);
        await this.prismaService.user
            .update({
                where: {id},
                data: {
                    password,
                    refresh_token: null
                }
            })
        return true;
    }

}
