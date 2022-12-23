import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";

import {CreateObservationDto, UpdateObservationDto} from "./dto";
import {PrismaService} from "../__core/prisma.service";
import {Exception} from "../__exceptions";

@Injectable()
export class ObservationService {

    constructor(private readonly prismaService: PrismaService) {
    }

    create(dto: CreateObservationDto): Promise<CreateObservationDto> {
        return Promise
            .resolve(this.prismaService.observation
                .create({
                    data: dto,
                    select: {
                        id: true,
                        number: true,
                        contract: true,
                        sim_cardNumber: true,
                        sim_card: true
                    }
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                    throw new NotFoundException(Exception.FORBIDDEN)
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    findAll(): Promise<CreateObservationDto[]> {
        return Promise
            .resolve(this.prismaService.observation
                .findMany({
                    select: {
                        id: true,
                        number: true,
                        contract: true,
                        sim_cardNumber: true
                    }
                }))
            .catch((error) => {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    findById(id: number): Promise<CreateObservationDto> {
        return Promise
            .resolve(this.prismaService.observation
                .findFirstOrThrow({
                    where: {id},
                    select: {
                        id: true,
                        number: true,
                        contract: true,
                        sim_cardNumber: true
                    }
                })
            )
            .catch((error) => {
                    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                        throw new NotFoundException(Exception.OBSERVATION_NOT_FOUND)
                    }
                    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
                }
            )
    }

    update(id: number, dto: UpdateObservationDto): Promise<CreateObservationDto> {
        return Promise
            .resolve(this.prismaService.observation
                .update({
                    where: {id},
                    data: dto,
                    select: {
                        id: true,
                        number: true,
                        contract: true,
                        firmId: true,
                        sim_card: true,
                        sim_cardNumber: true
                    }
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.OBSERVATION_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    addSimCard(id: number, simId: number): Promise<CreateObservationDto> {
        return Promise
            .resolve(this.prismaService.observation
                .update({
                    where: {id},
                    data: {
                        sim_card: {
                            connect: {
                                id: simId
                            }
                        }
                    },
                    select: {
                        id: true,
                        number: true,
                        contract: true,
                        sim_cardNumber: true
                    }
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                    throw new NotFoundException(Exception.OBSERVATION_NOT_FOUND);
                }
                throw  new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    deleteSimCard(id: number): Promise<CreateObservationDto> {
        return Promise
            .resolve(this.prismaService.observation
                .update({
                    where: {id},
                    data: {
                        // sim_card: null
                        sim_card: {
                            disconnect: true
                        }
                    },
                    select: {
                        id: true,
                        number: true,
                        contract: true,
                        sim_cardNumber: true
                    }
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                    throw new NotFoundException(Exception.OBSERVATION_NOT_FOUND);
                }
                throw  new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    delete(id: number): Promise<any> {
        return Promise
            .resolve(this.prismaService.observation
                .delete({
                    where: {id}
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                    throw new NotFoundException(Exception.OBSERVATION_NOT_FOUND);
                }
                throw  new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })

    }


}
