import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class CreateClientDto {

    @ApiProperty({example: "ТОВ 'Джерельна вода'", description: "Назва організації"})
    @IsString()
    public name: string;

    @ApiProperty({example: "м.Івано-Франківськ", description: "Місто"})
    @IsString()
    public city: string;

    @ApiProperty({example: "вул.Довженка 1", description: "Адреса організації"})
    @IsString()
    @IsOptional()
    public address?: string;

    @ApiProperty({example: "48.93609243561525, 24.74695169142123", description: "Координати організації"})
    @IsString()
    @IsOptional()
    public coordinate?: string;

    @ApiProperty({example: "Договір №15 від 20.01.2022", description: "Договір на обслуговування"})
    @IsString()
    @IsOptional()
    public service_contract?: string;
    // public contact_person?: CreateContactPersonDto[];
    // public fire_extinguishers?: CreateFireExtinguishersDto[];
    // public fire_hydrant?: CreateFireHydrantDto;
    // public fire_resistant_impregnation?: CreateFireResistantImpregnationDto;
    // public observation?: CreateObservationDto;
}
