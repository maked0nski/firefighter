import { IsEmail, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {RoleEnum, StatusEnum} from "../enum";

export class CreateUserDto {

    @ApiProperty({example: 'Андрій', description: "Ім'я"})
    @IsString()
    @IsOptional()
    public name: string;

    @ApiProperty({example: '050-321-21-12', description: "№ телефону. Унікальний"})
    @IsString()
    @IsOptional()
    public phone: string;

    @ApiProperty({example: 'klopotenko@gmail.com', description: "Електронна пошта. Унікальна"})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiProperty({example: '31.12.1982', description: "Дата народження"})
    @IsOptional()
    @IsString()
    public birthday: string;

    @ApiProperty({example: 'qwerty12', description: "Пароль від 8 до 20 символів"})
    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    public password: string;

    @ApiProperty({example: 'url', description: "посилання на аватарку користувача"})
    @IsString()
    @IsOptional()
    public image?: string;

    @ApiProperty({example: 'ADMIN', description: "Роль користувача USER, ADMIN чи ROOT"})
    @IsOptional()
    public role?: RoleEnum;

    @ApiProperty({example: 'blocked', description: "Статус користувача"})
    @IsOptional()
    public status?: StatusEnum;
}
