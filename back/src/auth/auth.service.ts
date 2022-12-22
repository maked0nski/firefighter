import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {ForbiddenException, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as argon from 'argon2';

import {PrismaService} from "../__core/prisma.service";
import {JwtPayload, Tokens} from "./types";
import {configs} from "../__configs";
import {AuthUserDto} from "./dto";


@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
    ) {
    }

    async registration(userDto: AuthUserDto): Promise<Tokens> {

        const hash = await argon.hash(userDto.password)

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
        const tokens = await this.getTokens(user.id, user.email, user.role);
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

        const passMatches = await argon.verify(user.password, userDto.password);
        if (!passMatches) throw  new ForbiddenException("Access Denied");

        const tokens = await this.getTokens(user.id, user.email, user.role);
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

        const rtMatches = await argon.verify(user.refresh_token, rt);
        if (!rtMatches) throw new ForbiddenException("Access Denied");

        const tokens = await this.getTokens(user.id, user.email, user.role);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }


    async updateRtHash(userId: number, rt: string): Promise<void> {
        const hash = await argon.hash(rt)
        await this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                refresh_token: hash,
            }
        })
    }

    async getTokens(userId: number, email: string, role:string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            id: userId,
            email: email,
            role: role
        };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: configs.ACCESS_TOKEN_SECRET,
                expiresIn: configs.ACCESS_TOKEN_EXPIRES,
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: configs.REFRESH_TOKEN_SECRET,
                expiresIn: configs.REFRESH_TOKEN_EXPIRES
            })
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
