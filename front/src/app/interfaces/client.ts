import {
  IClientContact,
  IFireExtinguishers,
  IFireHydrantUpdate,
  IFireResistantImpregnation,
  IObservation
} from "./";

export interface IClient {
  id: number;
  name: string;
  city: string,
  address: string;
  coordinate: string;
  service_contract: string;
  contact_person?: IClientContact[];
  fire_extinguishers?: IFireExtinguishers[];
  fire_hydrant: IFireHydrantUpdate;
  fire_resistant_impregnation: IFireResistantImpregnation;
  observation?: IObservation
}
