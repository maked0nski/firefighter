import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber, IsString} from "class-validator";

export class CreateFireResistantImpregnationDto {

    @ApiProperty({example:true, description:"Чи нагадувати про наближення часу перевірки?"})
    @IsBoolean()
    public reminding:boolean;

    @ApiProperty({example: 'Хлорка )', description: 'Рідина якою просочували'})
    @IsString()
    public seepage_liquid:string;

    @ApiProperty({example: 450, description: 'Просочувана площа в м2'})
    @IsNumber()
    public area:number;

    @ApiProperty({example: '02.05.2023', description: 'Дата наступної просочки вогнетривким розчином конструкцій'})
    @IsString()
    public next_check:string;
}