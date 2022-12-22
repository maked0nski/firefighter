import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../__core/prisma.service";
import {CreateFireHydrantDto, UpdateFireHydrantDto} from "./dto";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {Exception} from "../__exceptions";


@Injectable()
export class FireHydrantService {

    constructor(private readonly prismaService: PrismaService) {
    }

    create(dto: CreateFireHydrantDto): Promise<CreateFireHydrantDto> {
        return Promise
            .resolve(
                this.prismaService.fire_hydrant.create({
                    data: {
                        ...dto,
                        firmId: dto.firmId
                    }
                })
            )
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRE_HYDRANT_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })


    }

    findById(id: number): Promise<UpdateFireHydrantDto> {
        return Promise
            .resolve(
                this.prismaService.fire_hydrant.findFirstOrThrow({where: {id}})
            )
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRE_HYDRANT_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    update(id: number, dto: UpdateFireHydrantDto): Promise<UpdateFireHydrantDto> {
        return Promise
            .resolve(this.prismaService.fire_hydrant.update({
                where: {id},
                data: {
                    reminding: dto.reminding,
                    quantity: dto.quantity,
                    next_check: dto.next_check
                },
                select: {
                    reminding: true,
                    quantity: true,
                    next_check: true,
                    client: true
                }
            }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRE_HYDRANT_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    addFirm(id: number, firmId: number): Promise<CreateFireHydrantDto> {
        return Promise
            .resolve(this.prismaService.fire_hydrant.update({
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
                        throw new NotFoundException(Exception.FIRE_HYDRANT_OR_FIRM_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    deleteFirm(id: number): Promise<CreateFireHydrantDto> {
        return Promise
            .resolve(
                this.prismaService.fire_hydrant.update({
                    where: {id},
                    data: {
                        client: {
                            disconnect: true
                        }
                    }
                })
            )
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRE_HYDRANT_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    delete(id: number): Promise<CreateFireHydrantDto> {
        return Promise
            .resolve(
                this.prismaService.fire_hydrant.delete({where: {id}})
            )
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRE_HYDRANT_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

}
