import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PositionDto {
    @ApiProperty({example: 'Мереджер', description: 'Посада працівника'})
    @IsString()
    @IsNotEmpty()
    public position: string;
}
