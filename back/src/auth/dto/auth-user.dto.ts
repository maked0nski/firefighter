import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class AuthUserDto {  //ToDo Валідація пошти та пароля

    @ApiProperty({example: 'klopotenko@gmail.com', description: "Електронна пошта. Унікальна"})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: 'qwerty12', description: "Пароль від 8 до 20 символів"})
    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    password: string
}