import {CreateFireResistantImpregnationDto} from "../../fire_resistant_impregnation/dto";
import {CreateFireExtinguishersDto} from "../../fire_extinguishers/dto";
import {CreateContactPersonDto} from "../../contact_person/dto";
import {CreateFireHydrantDto} from "../../fire_hydrant/dto";
import {CreateObservationDto} from "../../observation/dto";

export class CreateClientDto {
    public name: string;
    public city: string;
    public address?: string;
    public coordinate?: string;
    public service_contract?: string;
    // public contact_person?: CreateContactPersonDto[];
    // public fire_extinguishers?: CreateFireExtinguishersDto[];
    // public fire_hydrant?: CreateFireHydrantDto;
    // public fire_resistant_impregnation?: CreateFireResistantImpregnationDto;
    // public observation?: CreateObservationDto;
}
