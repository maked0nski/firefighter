import {environment} from "../../environments/environment";

let {API} = environment;

export const urls = {
  login: `${API}/auth/login`,
  register: `${API}/auth/register`,
  logout: `${API}/auth/logout`,
  refresh: `${API}/auth/refresh`,
  role: `${API}/auth/role`,

  users: `${API}/users`,



  fuel_card: `${API}/fuel_card`,

  sim_card: `${API}/sim_card`,
  position: `${API}/position`,
  observation: `${API}/observation`,
  impregnation: `${API}/fire_resistant_impregnation`,
  hydrant: `${API}/hydrant`,
  extinguishers: `${API}/fire_extinguishers`,
  contact: `${API}/contact_person`,
  client: `${API}/client`,
  cars: `${API}/cars`,


}
