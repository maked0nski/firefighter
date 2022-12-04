import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {PrismaService} from "../core/prisma.service";
import {CreateCarDto, UpdateCarDto} from "./dto";
import {Exception} from "../exceptions";
import {remind} from "../utils";

@Injectable()
export class CarService {

    constructor(private readonly prismaService: PrismaService) {
    }

    create(carDto: CreateCarDto): Promise<CreateCarDto> {
        return Promise
            .resolve(this.prismaService.car
                .create({
                    data: {
                        ...carDto,
                        timeLeft: remind(carDto.insurance)
                    }
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.CAR_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    getAll(): Promise<CreateCarDto[]> {
        return Promise
            .resolve(this.prismaService.car
                .findMany())
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.CAR_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    getById(id: number): Promise<CreateCarDto> {
        return Promise
            .resolve(this.prismaService.car
                .findFirstOrThrow({
                    where: {id}
                }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.CAR_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    };

    update(id: number, car: Partial<UpdateCarDto>): Promise<CreateCarDto> {
        return Promise.resolve(this.prismaService.car
            .update({
                where: {id},
                data: {
                    vin: car.vin,
                    model: car.model,
                    fuel: car.fuel,
                    year: car.year,
                    passport_car: car.passport_car,
                    oddometr: car.oddometr,
                    insurance: car.insurance
                }
            }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.CAR_NOT_FOUND)
                    }
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }

    delete(id: number): Promise<CreateCarDto> {
        return Promise.resolve(this.prismaService.car
            .delete({
                where: {id}
            }))
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                    throw new NotFoundException(Exception.CAR_NOT_FOUND)
                }
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            })
    }


}
