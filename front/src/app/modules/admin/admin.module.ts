import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {IMaskModule} from 'angular-imask';
import {ReactiveFormsModule} from "@angular/forms";

import {MaterialModule} from "../../material-module";
import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {SharedModule} from './shared/shared.module';
import {FuelCardService} from "./service";
import {MainInterceptor} from "../../main.interceptor";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {TelephonePipe} from "./pipes/telephone.pipe";
import {
  AdminComponent,
  FuelCardsComponent,
  HeaderComponent, PositionComponent,
  SidebarComponent, SimCardComponent,
  ToolbarComponent,
  UserProfileComponent,
  ClientsComponent,
  CarsComponent,
  ClientDetailsComponent,
  FireExtinguishersComponent,
  ObservationComponent,
  FireResistantImpregnationComponent,
  FireHydrantComponent,
  UsersComponent
} from "./commponens";


@NgModule({
  declarations: [
    AdminLayoutComponent,
    HeaderComponent,
    AdminComponent,
    ToolbarComponent,
    SidebarComponent,
    FuelCardsComponent,
    UserProfileComponent,
    SimCardComponent,
    PositionComponent,
    ClientsComponent,
    CarsComponent,
    ClientDetailsComponent,
    FireExtinguishersComponent,
    ObservationComponent,
    FireResistantImpregnationComponent,
    FireHydrantComponent,
    TelephonePipe,
    UsersComponent
  ],
  exports: [
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    IMaskModule,
    MaterialFileInputModule,
  ],
  providers: [
    FuelCardService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: MainInterceptor
    }
  ]
})
export class AdminModule {
}
