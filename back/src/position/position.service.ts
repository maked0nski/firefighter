import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";

import {PrismaService} from "../__core/prisma.service";
import {Exception} from "../__exceptions";
import {PositionDto} from "./dto";

@Injectable()
export class PositionService {

    constructor(private readonly prismaService: PrismaService) {
    }


    create(data: PositionDto): Promise<PositionDto> {
        return Promise
            .resolve(this.prismaService.position
                .create({data}))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                    throw new ForbiddenException(Exception.FORBIDDEN);
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }


    getAll(): Promise<PositionDto[]> {
        return Promise
            .resolve(this.prismaService.position
                .findMany())
            .catch((error) => {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })

    }


    getById(id: number): Promise<PositionDto> {
        return Promise.resolve(this.prismaService.position.findUniqueOrThrow({
            where: {
                id
            }
        }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                    throw new NotFoundException(Exception.POSITION_NOT_FOUND)
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }


    update(id: number, data: PositionDto): Promise<PositionDto> {
        return Promise
            .resolve(this.prismaService.position
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
                        throw new NotFoundException(Exception.POSITION_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }


    delete(id: number): Promise<PositionDto> {
        return Promise
            .resolve(this.prismaService.position
                .delete({
                    where: {id}
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                    throw new NotFoundException(Exception.POSITION_NOT_FOUND)
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }
}

