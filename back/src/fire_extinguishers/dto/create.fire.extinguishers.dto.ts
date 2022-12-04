import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateFireExtinguishersDto {

    @ApiProperty({example: true, description: "Чи нагадувати про наближення часу перевірки?"})
    @IsBoolean()
    public reminding: boolean;

    @ApiProperty({example: 'ВП-5 )', description: 'Назва вогнегасника'})
    @IsString()
    public model: string;

    @ApiProperty({example: 55, description: 'Кількість'})
    @IsNumber()
    public quantity: number;

    @ApiProperty({example: '02.05.2023', description: 'Дата наступної повірки вогнегасника'})
    @IsString()
    public next_check: string;

    @ApiProperty({example: '2', description: 'ID фірми якій належать вогнегасники'})
    @IsNumber()
    @IsOptional()
    public firmId: number;
}