import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreateContactPersonDto, UpdateContactPersonDto} from "./dto";
import {PrismaService} from "../__core/prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {Exception} from "../__exceptions";


@Injectable()

export class ContactPersonService {

    constructor(private readonly prismaService: PrismaService) {
    }

    create(dto: CreateContactPersonDto): Promise<CreateContactPersonDto> {
        return Promise
            .resolve(this.prismaService.contact_person
                .create({data: dto}))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    getAll(): Promise<CreateContactPersonDto[]> {
        return Promise
            .resolve(this.prismaService.contact_person
                .findMany())
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            });
    }

    getById(id: number): Promise<CreateContactPersonDto> {
        return Promise
            .resolve(this.prismaService.contact_person
                .findFirstOrThrow({
                    where: {id}
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            });
    }

    update(id: number, dto: Partial<UpdateContactPersonDto>): Promise<CreateContactPersonDto> {
        return Promise
            .resolve(this.prismaService.contact_person
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
                        throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            });
    }

    addFirm(id: number, dto: Partial<UpdateContactPersonDto>): Promise<CreateContactPersonDto> {
        return Promise
            .resolve(this.prismaService.contact_person
                .update({
                    where:{id},
                    data: {
                        client: {
                            connect: {
                                id: dto?.firmId
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
                        throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            });

    }



    delete(id: number): Promise<CreateContactPersonDto> {
        return Promise
            .resolve(this.prismaService.contact_person
                .delete({where: {id}}))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            });
    }

    deleteFirmId(id: number) {
        return Promise
            .resolve(this.prismaService.contact_person
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
                        throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            });
    }
}
