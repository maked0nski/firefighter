import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ForgotPasswordDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;
}
