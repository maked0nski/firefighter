import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateFireExtinguishersDto {

    @ApiProperty({example: true, description: "Чи нагадувати про наближення часу перевірки?"})
    @IsBoolean()
    @IsOptional()
    public reminding?: boolean;

    @ApiProperty({example: 'ВП-5 )', description: 'Назва вогнегасника'})
    @IsString()
    @IsOptional()
    public model?: string;

    @ApiProperty({example: 55, description: 'Кількість'})
    @IsNumber()
    @IsOptional()
    public quantity?: number;

    @ApiProperty({example: '02.05.2023', description: 'Дата наступної повірки вогнегасника'})
    @IsString()
    @IsOptional()
    public next_check?: string;
}