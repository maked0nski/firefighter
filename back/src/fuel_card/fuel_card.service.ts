import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../__core/prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";

import {UpdateFuelCardDto, CreateFuelCardDto} from "./dto";
import {Exception} from "../__exceptions";

@Injectable()
export class FuelCardService {
    constructor(private prismaService: PrismaService) {
    }

    createFuelCard(data: CreateFuelCardDto): Promise<CreateFuelCardDto> {
        return Promise
            .resolve(this.prismaService.fuel_card
                .create({data}))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                    throw new NotFoundException(Exception.FORBIDDEN)
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }


    getAllFuelCards(): Promise<CreateFuelCardDto[]> {
        return Promise.resolve(this.prismaService.fuel_card.findMany())
            .catch((error) => {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }


    getFuelCardById(id: number): Promise<CreateFuelCardDto> {
        return Promise
            .resolve(this.prismaService.fuel_card
                .findUniqueOrThrow({
                    where: {id}
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.CARD_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }


    updateFuelCardById(id: number, data: UpdateFuelCardDto): Promise<CreateFuelCardDto> {
        return Promise
            .resolve(this.prismaService.fuel_card
                .update({
                    where: {id},
                    data
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.CARD_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }


    addUser(id: number, userId: number): Promise<CreateFuelCardDto> {
        return Promise
            .resolve(this.prismaService.fuel_card
                .update({
                    where: {id},
                    data: {
                        users: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                }))
            .catch((error) => {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    deleteUser(id: number): Promise<CreateFuelCardDto> {
        return Promise
            .resolve(this.prismaService.fuel_card
                .update({
                    where: {id},
                    data: {
                        users: {
                            disconnect: true
                        }
                    }
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.CARD_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }


    deleteFuelCardById(id: number): Promise<CreateFuelCardDto> {
        return Promise
            .resolve(this.prismaService.fuel_card
                .delete({
                    where: {id}
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.CARD_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }
}
