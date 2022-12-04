import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreateObservationDto, ObservationWithSimDto, UpdateObservationDto} from "./dto";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {PrismaService} from "../core/prisma.service";
import {Exception} from "../exceptions";

@Injectable()
export class ObservationService {

    constructor(private readonly prismaService: PrismaService) {
    }

    create(dto: CreateObservationDto): Promise<CreateObservationDto> {
        return Promise
            .resolve(this.prismaService.observation.create({data: dto}))
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
                        sim_cardId: true
                    }
                }))
            .catch((error) => {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    findById(id: number): Promise<ObservationWithSimDto> {
        return Promise
            .resolve(this.prismaService.observation
                .findFirstOrThrow({
                    where: {id},
                    select: {
                        id: true,
                        number: true,
                        contract: true,
                        sim_cardId: true
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

    update(id: number, dto: UpdateObservationDto): Promise<ObservationWithSimDto> {
        return Promise
            .resolve(this.prismaService.observation
                .update({
                    where: {id},
                    data: {
                        number: dto.number,
                        contract: dto.contract,
                    },
                    select: {
                        id: true,
                        number: true,
                        contract: true,
                        sim_cardId: true
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

    addSimCard(id: number, simId: number): Promise<ObservationWithSimDto> {
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
                        sim_cardId: true
                    }
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                    throw new NotFoundException(Exception.OBSERVATION_NOT_FOUND);
                }
                throw  new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    deleteSimCard(id: number): Promise<ObservationWithSimDto> {
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
                        sim_cardId: true
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