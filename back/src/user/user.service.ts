import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {PrismaService} from '../__core/prisma.service';
import {MailerService} from "@nestjs-modules/mailer";
import {join} from 'path';

import {Exception} from "../__exceptions";
import {AuthUserDto} from "../auth/dto";
import {UpdateUserDto} from "./dto";
import {UserType} from "./type";


@Injectable()
export class UserService {

    constructor(
        private prismaService: PrismaService,
        private readonly mailerService: MailerService
    ) {
    }

    async create(user: AuthUserDto) {
        return await this.prismaService.user
            .create({
                data: user,
            });
    }

    async getAll() {
        return await this.prismaService.user.findMany({
            select: {
                id: true,
                surename: true,
                name: true,
                fathersname: true,
                phone: true,
                email: true,
                birthday: true,
                image: true,
                role: true,
            }
        });
    }

    async getAllWithCar(): Promise<UserType[]> {
        return this.prismaService.user.findMany({
            where: {
                car: {
                    isNot: null
                }
            },
            select: {
                id: true,
                surename: true,
                name: true,
                fathersname: true,
                phone: true,
                email: true,
                birthday: true,
                image: true,
                role: true,
                car: true,
            }
        });
    }

    async clearNotRegistredUser() {

        return await this.prismaService.user
            .findMany({
                where: {
                    verificationCodeAt: {
                        lt: new Date()
                    },
                }
            })
    }

    async getAllWithPosition(): Promise<UserType[]> {
        return await this.prismaService.user.findMany({
            where: {
                position: {
                    isNot: null
                }
            },
            select: {
                id: true,
                surename: true,
                name: true,
                fathersname: true,
                phone: true,
                email: true,
                birthday: true,
                image: true,
                role: true,
                positionId: true,
            }
        });
    }

    async getAllWithCarAndPosition(): Promise<UserType[]> {
        return await this.prismaService.user.findMany({
            where: {
                position: {isNot: null},
                car: {isNot: null}
            },
            select: {
                id: true,
                surename: true,
                name: true,
                fathersname: true,
                phone: true,
                email: true,
                birthday: true,
                image: true,
                role: true,
                positionId: true,
                car: true,
            }
        });
    }

    async getById(id: number): Promise<UserType> {
        return await this.prismaService.user.findUniqueOrThrow({
            where: {id: id},
            select: {
                id: true,
                surename: true,
                name: true,
                fathersname: true,
                phone: true,
                email: true,
                birthday: true,
                image: true,
                role: true,
                car: true,
                positionId: true,
                fuel_card: true
            }
        })
            .catch((error) => {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            })

    }

    async updateUser(userId: number, data: Partial<UpdateUserDto>): Promise<UserType> {

        try {
            return await this.prismaService.user
                .update({
                    where: {id: userId},
                    data,
                    // data: {
                    //     surename: data.surename,
                    //     name: data.name,
                    //     fathersname: data.fathersname,
                    //     phone: data.phone,
                    //     birthday: data.birthday,
                    //     image: data.image,
                    //     role: data.role,
                    // },
                    select: {
                        id: true,
                        surename: true,
                        name: true,
                        fathersname: true,
                        phone: true,
                        email: true,
                        birthday: true,
                        image: true,
                        role: true,
                        car: true,
                        positionId: true,
                        fuel_card: true
                    }
                })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(Exception.FORBIDDEN);
                }
                if (error.code === 'P2025') {
                    throw new NotFoundException(Exception.USER_NOT_FOUND)
                }
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async addPosition(userId: number, positionId: number): Promise<UserType> {
        try {
            return await this.prismaService.user
                .update({
                    where: {id: userId},
                    data: {
                        position: {
                            connect: {
                                id: positionId
                            }
                        }
                    },
                    select: {
                        id: true,
                        surename: true,
                        name: true,
                        fathersname: true,
                        phone: true,
                        email: true,
                        birthday: true,
                        image: true,
                        role: true,
                        car: true,
                        position: true,
                        fuel_card: true
                    }
                })
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }

    }

    async deletePosition(userId: number): Promise<UserType> {
        try {
            return await this.prismaService.user
                .update({
                    where: {id: userId},
                    data: {
                        position: {
                            disconnect: true
                        }
                    },
                    select: {
                        id: true,
                        surename: true,
                        name: true,
                        fathersname: true,
                        phone: true,
                        email: true,
                        birthday: true,
                        image: true,
                        role: true,
                        car: true,
                        position: true,
                        fuel_card: true
                    }
                })
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }

    }

    async addCar(userId: number, carId: number): Promise<UserType> {
        try {
            return await this.prismaService.user
                .update({
                    where: {id: userId},
                    data: {
                        car: {
                            connect: {
                                id: carId
                            }
                        }
                    },
                    select: {
                        id: true,
                        surename: true,
                        name: true,
                        fathersname: true,
                        phone: true,
                        email: true,
                        birthday: true,
                        image: true,
                        role: true,
                        car: true,
                        positionId: true,
                        fuel_card: true
                    }
                })
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteCar(userId: number): Promise<UserType> {
        try {
            return await this.prismaService.user
                .update({
                    where: {id: userId},
                    data: {
                        car: {
                            disconnect: true
                        }
                    },
                    select: {
                        id: true,
                        surename: true,
                        name: true,
                        fathersname: true,
                        phone: true,
                        email: true,
                        birthday: true,
                        image: true,
                        role: true,
                        car: true,
                        positionId: true,
                        fuel_card: true
                    }
                })
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteUser(id: number): Promise<void> {
        try {
            await this.prismaService.user.delete({
                where: {id}
            });
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }

    }

    async sendConfirmMail(user: UserType) {
        const urlConfirmAddress = "temp address";

        // ?????????????????? ??????????
        return await this.mailerService
            .sendMail({
                to: user.email,
                subject: '?????????????????????????? ????????????????????',
                template: join(__dirname, '/../templates', 'confirmReg'),
                context: {
                    id: user.id,
                    username: user.name,
                    urlConfirmAddress,
                },
            })
            .catch((e) => {
                throw new HttpException(
                    `?????????????? ???????????? ??????????: ${JSON.stringify(e)}`,
                    HttpStatus.UNPROCESSABLE_ENTITY,
                );
            });
    }

    async getByEmail(email: string): Promise<UserType> {
        return await this.prismaService.user
            .findUnique({
                where: {
                    email: String(email)
                },
                select: {
                    id: true,
                    surename: true,
                    name: true,
                    fathersname: true,
                    phone: true,
                    email: true,
                    birthday: true,
                    image: true,
                    role: true,
                    car: true,
                    positionId: true,
                    fuel_card: true
                }
            }).catch((error) => {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            })
    }
}
