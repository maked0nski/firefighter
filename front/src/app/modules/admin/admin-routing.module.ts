import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {FuelCardsComponent} from "./commponens/fuel-cards/fuel-cards.component";
import {
  CarsResolver, ClientDetailsResolver,
  ClientsResolver,
  FuelCardResolverService,
  PositionResolver,
  SimCardResolver
} from "./service/resolve";
import {UserProfileComponent} from "./commponens/user-profile/user-profile.component";
import {SimCardComponent} from "./commponens/sim-card/sim-card.component";
import {PositionComponent} from "./commponens/position/position.component";
import {ClientsComponent} from "./commponens/clients/clients.component";
import {CarsComponent} from "./commponens/cars/cars.component";
import {ClientDetailsComponent} from "./commponens/client-details/client-details.component";


const routes: Routes = [
  {
    path: "", component: AdminLayoutComponent, children: [
      {path: 'fuel_cards', component: FuelCardsComponent, resolve: {fuelCard: FuelCardResolverService}},
      {path: 'userProfile', component: UserProfileComponent},
      {path: 'sim_cards', component: SimCardComponent, resolve: {simCard: SimCardResolver}},
      {path: 'positions', component: PositionComponent, resolve: {positions: PositionResolver}},
      {path: 'clients', component: ClientsComponent, resolve: {clients: ClientsResolver}},
      {path: 'clients/:id', component: ClientDetailsComponent, resolve:{allData:ClientDetailsResolver}},
      {path: 'cars', component: CarsComponent, resolve: {cars: CarsResolver}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
