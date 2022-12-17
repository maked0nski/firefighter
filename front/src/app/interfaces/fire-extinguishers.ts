export interface IFireExtinguishers {
  id: number,
  reminding: boolean,
  model: string,
  quantity: number,
  next_check: string,
  firmId: number,
  timeLeft:string
}

export interface Ifire_extinguishers {
  value: string;
  viewValue: string;
}