import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString, Max, Min} from "class-validator";

export class UpdateObservationDto {
    @ApiProperty({example: '12341', description: 'Обєктовий номер на пульті цілодобового спостереження', required:false})
    @IsNumber()
    @Min(1000)
    @Max(99999)
    @IsOptional()
    public number?: number;

    @ApiProperty({example: '№1526 від 20.01.2022 ', description: 'Номер та дада договору на спостереження', required:false})
    @IsString()
    @IsOptional()
    public contract?: string;

    @ApiProperty({example: '1', description: 'id сім карти яка закріплена за обєктом', required:false})
    @IsOptional()
    @IsString()
    public sim_cardNumber: string;
}
