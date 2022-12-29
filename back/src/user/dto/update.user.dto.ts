import {IsEnum, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

import {RoleEnum, StatusEnum} from "../enum";

export class UpdateUserDto {

    @ApiProperty({example: 'Клопотенко', description: 'Прізвище', required: false})
    @IsString()
    @IsOptional()
    public surename?: string;

    @ApiProperty({example: 'Андрій', description: "Ім'я", required: false})
    @IsString()
    @IsOptional()
    public name?: string;

    @ApiProperty({example: 'Богданович', description: "По батькові", required: false})
    @IsString()
    @IsOptional()
    public fathersname?: string;

    @ApiProperty({example: '(050) 86-99-012', description: "№ телефону", required: false})
    @IsString()
    @IsOptional()
    public phone?: string;

    @ApiProperty({example: '31.12.1982', description: "Дата народження строка", required: false})
    @IsString()
    @IsOptional()
    public birthday?: string;

    @ApiProperty({
        example: '"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"',
        description: "Посилання на фото користувача",
        required: false
    })
    @IsString()
    @IsOptional()
    public image?: string;

    @ApiProperty({example: 'ADMIN', description: "Роль користувача USER, ADMIN чи ROOT"})
    @IsOptional()
    @IsString()
    @IsEnum(RoleEnum)
    public role?: RoleEnum;

    @ApiProperty({example: 'pending', description: "Статус користувача pending, active чи blocked", required: false})
    @IsString()
    @IsOptional()
    @IsEnum(StatusEnum)
    public status?: StatusEnum;

    @ApiProperty({
        example: 'як токен',
        description: "Код підтверждення при створенні користувача, зміні пароля...",
        required: false
    })
    @IsString()
    @IsOptional()
    public verificationCode?: string;

    @IsString()
    @IsOptional()
    public verificationCodeAt?: string;
}
