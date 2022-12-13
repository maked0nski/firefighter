import {ISimCard} from "./sim-card";

export interface IObservation {
  id: number,
  number: number,
  contract: string,
  sim_cardNumber: string,
  sim_card?: ISimCard
}
