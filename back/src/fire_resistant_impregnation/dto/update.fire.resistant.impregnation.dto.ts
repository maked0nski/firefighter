import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateFireResistantImpregnationDto {

    @ApiProperty({example:true, description:"Чи нагадувати про наближення часу перевірки?"})
    @IsBoolean()
    @IsOptional()
    public reminding?:boolean;

    @ApiProperty({example: 'Хлорка )', description: 'Рідина якою просочували'})
    @IsString()
    @IsOptional()
    public seepage_liquid?:string;

    @ApiProperty({example: 450, description: 'Просочувана площа в м2'})
    @IsNumber()
    @IsOptional()
    public area?:number;

    @ApiProperty({example: '02.05.2023', description: 'Дата наступної просочки вогнетривким розчином конструкцій'})
    @IsString()
    @IsOptional()
    public next_check?:string;
}