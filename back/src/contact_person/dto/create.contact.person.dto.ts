import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class CreateContactPersonDto {

    // @ApiProperty({example: "Баранов", description: "Прізвише контактної особи"})
    // @IsString()
    // public surename?: string;

    @ApiProperty({example: "Олег", description: "Ім'я контактної особи"})
    @IsString()
    public name: string;

    // @ApiProperty({example: "Кіркорович", description: "По батькові контактної особи"})
    // @IsString()
    // public fathersname?: string;

    @ApiProperty({example: "050 54 66 254", description: "Номер телефону контактної особи"})
    @IsString()
    public phone: string;

    @ApiProperty({example: "Відповідальний", description: "Посада контактної особи"})
    @IsString()
    @IsOptional()
    public position?: string;

    @ApiProperty({example: "email@gmail.com", description: "Електронна адреса контактної особи"})
    @IsString()
    @IsOptional()
    public email?: string;

}