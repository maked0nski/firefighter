import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class PositionDto {
    @ApiProperty({example: 'Мереджер', description: 'Посада працівника'})
    @IsString()
    @IsNotEmpty()
    public position: string;
}