import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../__core/prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {Exception} from "../__exceptions";
import {CreateFireResistantImpregnationDto, UpdateFireResistantImpregnationDto} from "./dto";

@Injectable()
export class FireResistantImpregnationService {

    constructor(private readonly prismaService: PrismaService) {
    }

    create(dto: CreateFireResistantImpregnationDto): Promise<CreateFireResistantImpregnationDto> {
        return Promise
            .resolve(this.prismaService.fire_resistant_impregnation
                .create({
                    data: dto
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    getById(id: number): Promise<CreateFireResistantImpregnationDto> {
        return Promise
            .resolve(this.prismaService.fire_resistant_impregnation
                .findFirstOrThrow({where: {id}}))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    update(id: number, dto: UpdateFireResistantImpregnationDto): Promise<CreateFireResistantImpregnationDto> {
        return Promise
            .resolve(this.prismaService.fire_resistant_impregnation
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
                        throw new NotFoundException(Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    addFirm(id: number, firmId: number): Promise<CreateFireResistantImpregnationDto> {
        return Promise
            .resolve(this.prismaService.fire_resistant_impregnation
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
                        throw new NotFoundException(Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    deleteFirm(id: number): Promise<CreateFireResistantImpregnationDto> {
        return Promise
            .resolve(this.prismaService.fire_resistant_impregnation
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
                        throw new NotFoundException(Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    delete(id: number): Promise<CreateFireResistantImpregnationDto> {
        return Promise
            .resolve(this.prismaService.fire_resistant_impregnation
                .delete({
                    where: {id}
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }
}
