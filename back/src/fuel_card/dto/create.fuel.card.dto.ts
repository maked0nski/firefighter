import {Station_brend} from "../type";
import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CreateFuelCardDto {

    @ApiProperty({example: '1234 1234 1234 1234', description: 'Номер паливної карточки 16 цифр роздылены по 4 пробелом'})
    @IsString()
    @Length(19,19)
    public number: string;

    @ApiProperty({example: '1234', description: 'Пін код до карточки 4 цифри'})
    @IsString()
    @Length(4,4)
    public pin: string;

    @ApiProperty({example: 'true', description: 'Чи активка карточка?'})
    @IsBoolean()
    @IsNotEmpty()
    public active: boolean;

    @ApiProperty({example: 'OKKO', description: "Яка заправка OKKO чи WOG", required:false})
    @IsString()
    @IsEnum(Station_brend)
    @IsOptional()
    public station_brend?: string;
}