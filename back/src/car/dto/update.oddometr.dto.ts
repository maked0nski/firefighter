import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class UpdateOddometrDto{
    @ApiProperty({example: '4 1234 1234', description: 'Показник оддометра авто (скільки проїхав км)'})
    @IsNumber()
    public oddometr: number
}