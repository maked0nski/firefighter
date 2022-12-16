import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {
  CarsComponent,
  ClientDetailsComponent,
  ClientsComponent,
  FuelCardsComponent,
  PositionComponent,
  SimCardComponent,
  UserProfileComponent, UsersComponent
} from "./commponens";
import {
  CarsResolver, ClientDetailsResolver,
  ClientsResolver,
  FuelCardResolverService,
  PositionResolver,
  SimCardResolver, UsersResolver
} from "./service/resolve";
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";


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
      {path: 'users', component: UsersComponent, resolve: {cars: UsersResolver}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
