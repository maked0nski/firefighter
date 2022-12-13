import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {PrismaService} from "../core/prisma.service";

import {CreateSimCardDto, UpdateSimCardDto} from "./dto";
import {Exception} from "../exceptions";

@Injectable()
export class SimCardService {

    constructor(private readonly prismaService: PrismaService) {
    }

    create(data: CreateSimCardDto): Promise<CreateSimCardDto> {
        return Promise
            .resolve(this.prismaService.sim_card
                .create({data: data}))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                    throw new NotFoundException(Exception.FORBIDDEN)
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })

    }

    findAll(): Promise<CreateSimCardDto[]> {
        return Promise
            .resolve(this.prismaService.sim_card
                .findMany())
            .catch((error) => {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    // findAll(): Promise<CreateSimCardDto[]> {
    //     return Promise
    //         .resolve(this.prismaService.sim_card
    //             .findMany())
    //         .catch((error) => {
    //             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    //         })
    // }

    // findActive(): Promise<CreateSimCardDto[]> {
    //     return Promise
    //         .resolve(this.prismaService.sim_card
    //             .findMany({
    //                 where: {
    //                     active: true
    //                 },
    //                 include: {
    //                     observation: {
    //                         select: {
    //                             sim_cardNumber: false
    //                         }
    //                     }
    //                 }
    //             }))
    //         .catch((error) => {
    //             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    //         })
    // }

    findFree(): Promise<CreateSimCardDto[]> {
        return Promise
            .resolve(this.prismaService.sim_card
                .findMany({
                    where: {
                        observation: {
                            is: null
                        },
                        active: true
                    }
                }))
    }

    findById(id: number): Promise<CreateSimCardDto> {
        return Promise
            .resolve(this.prismaService.sim_card
                .findUniqueOrThrow({
                    where: {id}
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                    throw new NotFoundException(Exception.SIM_CARD_NOT_FOUND)
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    update(id: number, data: UpdateSimCardDto): Promise<CreateSimCardDto> {
        return Promise
            .resolve(this.prismaService.sim_card
                .update({
                    where: {id},
                    data: data
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.SIM_CARD_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    delete(id: number) {
        return Promise
            .resolve(this.prismaService.sim_card
                .delete({
                    where: {id}
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                    throw new NotFoundException(Exception.SIM_CARD_NOT_FOUND);
                }
                throw  new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

}
