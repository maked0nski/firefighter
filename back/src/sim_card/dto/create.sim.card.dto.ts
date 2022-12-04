import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {OperatorEnum} from "../enum";

export class CreateSimCardDto {

    @ApiProperty({example: '0501122333', description: 'Номер тенефона сім карти 15 символів'})
    @IsString()
    @Length(10, 10)
    public number: string;

    @ApiProperty({
        example: 'Kyivstar',
        description: "Вказати мобільного оператора enum = Kyivstar, Vodafone. По замовчуванню Kyivstar"
    })
    @IsString()
    @IsEnum(OperatorEnum)
    @IsOptional()
    public operator: string;

    @ApiProperty({example: 'true', description: 'Чи активка карточка?'})
    @IsBoolean()
    @IsNotEmpty()
    public active: boolean;

    // @ApiProperty({example: 'true', description: 'У кого з клієнтів карточка'})
    // @IsOptional()
    // public observation?: number;
}