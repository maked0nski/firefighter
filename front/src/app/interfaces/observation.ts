import {ISimCard} from "./sim-card";

export interface IObservation {
  id: number,
  number: number,
  contract: string,
  sim_cardId: number,
  sim_card?: ISimCard
}
