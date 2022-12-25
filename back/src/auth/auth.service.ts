import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {ForbiddenException, Injectable} from '@nestjs/common';
import {SignOptions} from 'jsonwebtoken';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

import {PrismaService} from "../__core/prisma.service";
import {MailService} from "../mail/mail.service";
import {UserService} from "../user/user.service";
import {JwtPayload, Tokens} from "./types";
import {UserType} from "../user/type";
import {configs} from "../__configs";
import * as process from "process";
import {AuthUserDto} from "./dto";
import {hash} from "../__utils";


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

    async sendConfirmation(user: Partial<UserType>) {
        // const expiresIn = 60 * 60 * 24; // 24 hours
        // let accessToken = process.env.ACCESS_TOKEN_SECRET;

        const option = {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: 60 * 60 * 24 // 24 hours
        }

        const tokenPayload = {
            id: user.id,
            status: user.status,
            role: user.role
        }
        // const verificationCodeAt = moment()
        //     .add(1, 'day')
        //     .toISOString();

        const verificationCode = await this.generateToken(tokenPayload, option);
        console.log("verificationCode: ", verificationCode)
        // const urlConfirmAddress = `${this.clientAppUrl}/auth/confirm?token=${verificationCode}`;
        //
        // console.log(urlConfirmAddress)


        await this.userService.updateUser(user.id, {verificationCode});

        return await this.mailService.sendUserConfirmation(user, verificationCode)

        // return await this.mailService.sendMail({
        //     to: user.email,
        //     subject: 'Підтверження реєстрації на сайті пожежного спостереження',
        //     template: join(__dirname, '/../__templates', 'confirmReg'),
        //     context: {
        //         id: user.id,
        //         username: user?.name,
        //         urlConfirmAddress,
        //     },
        // })
        //     .catch((e) => {
        //         throw new HttpException(
        //             `Помилка роботи пошти: ${JSON.stringify(e)}`,
        //             HttpStatus.UNPROCESSABLE_ENTITY,
        //         );
        //     });

    }

    private async generateToken(data, options?: SignOptions): Promise<string> {
        return this.jwtService.signAsync(data, options);
    }

    async signUp(userDto: AuthUserDto): Promise<boolean> {

        const password = await hash(userDto.password)
        const user = await this.prismaService.user
            .create({
                data: {
                    email: userDto.email,
                    password,
                }
            })
        await this.sendConfirmation(user);
        return true
    }


    async registration(userDto: AuthUserDto): Promise<Tokens> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userDto.password, salt);

        const user = await this.prismaService.user
            .create({
                data: {
                    email: userDto.email,
                    password: hash,
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
        if (!user) throw  new ForbiddenException("Access Denied");

        const passMatches = await bcrypt.compare(user.password, userDto.password);

        if (!passMatches) throw  new ForbiddenException("Access Denied");

        const tokens = await this.createTokens(user.id, user.email, user.role);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }

    async logout(userId: number): Promise<boolean> {
        await this.prismaService.user.updateMany({
            where: {
                id: userId,
                refresh_token: {
                    not: null,
                },
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

        const refresh_token = await hash(rt)
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

}
