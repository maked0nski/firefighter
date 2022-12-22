import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreateFireExtinguishersDto, UpdateFireExtinguishersDto} from "./dto";
import {PrismaService} from "../__core/prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {Exception} from "../__exceptions";

@Injectable()
export class FireExtinguishersService {

    constructor(private prismaService: PrismaService) {
    }

    create(dto: CreateFireExtinguishersDto): Promise<CreateFireExtinguishersDto> {
        console.log(dto)
        return Promise
            .resolve(this.prismaService.fire_extinguishers
                .create({data: dto}))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRE_EXTINGUISHER_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    getById(id: number): Promise<CreateFireExtinguishersDto> {
        return Promise
            .resolve(this.prismaService.fire_extinguishers
                .findFirstOrThrow({where: {id}}))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRE_EXTINGUISHER_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    update(id: number, dto: UpdateFireExtinguishersDto): Promise<CreateFireExtinguishersDto> {
        return Promise
            .resolve(this.prismaService.fire_extinguishers
                .update({
                    where: {id},
                    data: dto
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRE_EXTINGUISHER_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    addFirm(id: number, firmId: number): Promise<CreateFireExtinguishersDto> {
        return Promise
            .resolve(this.prismaService.fire_extinguishers
                .update({
                    where: {id},
                    data: {
                        client: {
                            connect: {
                                id: firmId
                            }
                        }
                    }
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRE_EXTINGUISHER_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    deleteFirm(id: number): Promise<CreateFireExtinguishersDto> {
        return Promise
            .resolve(this.prismaService.fire_extinguishers
                .update({
                    where: {id},
                    data: {
                        client: {
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
                        throw new NotFoundException(Exception.FIRE_EXTINGUISHER_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    delete(id: number): Promise<CreateFireExtinguishersDto> {
        return Promise
            .resolve(this.prismaService.fire_extinguishers
                .delete({
                    where: {id}
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRE_EXTINGUISHER_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }
}
