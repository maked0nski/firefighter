import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateFireHydrantDto {

    @ApiProperty({example: true, description: "Чи нагадувати про наближення часу перевірки?"})
    @IsBoolean()
    public reminding: boolean;

    @ApiProperty({example: 4, description: 'Кількість пожежних гідрантів'})
    @IsNumber()
    public quantity: number;

    @ApiProperty({example: '02.05.2023', description: 'Дата наступної перевірки пожежних гідрантів'})
    @IsString()
    public next_check: string;

    @ApiProperty({example: 4, description: 'Id фірми власника вогнегасників'})
    @IsNumber()
    @IsOptional()
    public firmId?: number;
}
