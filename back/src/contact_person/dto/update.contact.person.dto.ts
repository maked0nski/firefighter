import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateContactPersonDto {

    // public surename?: string;
    @ApiProperty({example: "Олег", description: "Ім'я контактної особи"})
    @IsString()
    @IsOptional()
    public name?: string;
    // public fathersname?: string;

    @ApiProperty({example: "050 54 66 254", description: "Номер телефону контактної особи"})
    @IsString()
    @IsOptional()
    public phone?: string;

    @ApiProperty({example: "Відповідальний", description: "Посада контактної особи"})
    @IsString()
    @IsOptional()
    public position?: string;

    @ApiProperty({example: "email@gmail.com", description: "Електронна адреса контактної особи"})
    @IsString()
    @IsOptional()
    @IsEmail()
    public email?: string;

    @ApiProperty({example: "email@gmail.com", description: "Електронна адреса контактної особи"})
    @IsNumber()
    @IsOptional()
    public firmId?: number;
}
