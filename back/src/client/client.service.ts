import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreateClientDto, UpdateClientDto} from "./dto";
import {PrismaService} from "../core/prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {Exception} from "../exceptions";

@Injectable()
export class ClientService {

    constructor(private prismaService: PrismaService) {
    }

    create(data: CreateClientDto): Promise<CreateClientDto> {
        return Promise
            .resolve(this.prismaService.client
                .create(
                    {
                        data
                    }
                ))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRM_CLIENT_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    getAll(): Promise<CreateClientDto[]> {
        return Promise
            .resolve(this.prismaService.client
                .findMany())
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRM_CLIENT_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    getAllDataById(id: number): Promise<CreateClientDto | null> {
        return Promise.resolve(this.prismaService.client
            .findUnique({
                where: {id},
                include: {
                    contact_person: true,
                    fire_extinguishers: true,
                    fire_hydrant: true,
                    fire_resistant_impregnation: true,
                    observation: {
                        include: {
                            sim_card: true,
                        }
                    }
                }
            }))
    }

    getById(id: number): Promise<CreateClientDto> {
        return Promise
            .resolve(this.prismaService.client
                .findFirstOrThrow({
                    where: {id}
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRM_CLIENT_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    update(id: number, dto: UpdateClientDto): Promise<CreateClientDto> {
        return Promise
            .resolve(this.prismaService.client
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
                        throw new NotFoundException(Exception.FIRM_CLIENT_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    delete(id: number): Promise<CreateClientDto> {
        return Promise
            .resolve(this.prismaService.client
                .delete({
                    where: {id}
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.FIRM_CLIENT_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }
}
