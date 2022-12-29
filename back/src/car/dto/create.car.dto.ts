import {IsEnum, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

import {Car_fuelEnum} from "../type/car_fuel.enum";

export class CreateCarDto {

    @ApiProperty({example: 'JN1WNYD21U0000001', description: 'VIN номер машини 17 символів', required: false})
    @IsString()
    @Length(17, 17)
    @IsOptional()
    public vin?: string;

    @ApiProperty({example: 'Lamborghini Diablo', description: 'Модель машини'})
    @IsString()
    public model: string;

    @ApiProperty({example: 'Газ', description: 'На якому паливі'})
    @IsString()
    @IsEnum(Car_fuelEnum)
    public fuel: string;


    @ApiProperty({example: '2001', description: 'Рік випуску авто'})
    @IsString()
    @Length(4, 4)
    public year: string;


    @ApiProperty({example: 'ав 3434543', description: 'Номер техпаспорта авто', required: false})
    @IsString()
    @IsOptional()
    public passport_car?: string;


    @ApiProperty({example: '4 1234 1234', description: 'Показник оддометра авто (скільки проїхав км)', required: false})
    @IsNumber()
    @IsOptional()
    public oddometr?: number;


    @ApiProperty({example: '01.01.2022', description: 'Дата Страхівка дійсна до', required: false})
    @IsString()
    @IsOptional()
    public insurance?: string;


}
