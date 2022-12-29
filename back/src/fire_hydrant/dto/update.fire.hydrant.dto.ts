import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateFireHydrantDto {

    @ApiProperty({example:true, description:"Чи нагадувати про наближення часу перевірки?"})
    @IsBoolean()
    @IsOptional()
    public reminding?: boolean;

    @ApiProperty({example: 4, description: 'Кільукість пожежних гідрантів'})
    @IsNumber()
    @IsOptional()
    public quantity?:number;

    @ApiProperty({example: '02.05.2023', description: 'Дата наступної перевірки пожежних гідрантів'})
    @IsString()
    @IsOptional()
    public next_check?:string;

    @ApiProperty({example: 4, description: 'Id фірми власника вогнегасників'})
    @IsNumber()
    @IsOptional()
    public firmId?: number;
}
