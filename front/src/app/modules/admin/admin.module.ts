import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {IMaskModule} from 'angular-imask';
import {ReactiveFormsModule} from "@angular/forms";

import {MaterialModule} from "../../material-module";
import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {HeaderComponent} from "./commponens/header/header.component";
import {AdminComponent} from './commponens/admin/admin.component';
import {ToolbarComponent} from "./commponens/toolbar/toolbar.component";
import {SharedModule} from './shared/shared.module';
import {SidebarComponent} from "./commponens/sidebar/sidebar.component";
import {FuelCardsComponent} from './commponens/fuel-cards/fuel-cards.component';
import {FuelCardService} from "./service";
import {MainInterceptor} from "../../main.interceptor";
import {UserProfileComponent} from './commponens/user-profile/user-profile.component';
import {SimCardComponent} from './commponens/sim-card/sim-card.component';
import {PositionComponent} from './commponens/position/position.component';
import {ClientsComponent} from './commponens/clients/clients.component';
import {CarsComponent} from './commponens/cars/cars.component';
import {ClientDetailsComponent} from './commponens/client-details/client-details.component';
import {FireExtinguishersComponent} from './commponens/fire-extinguishers/fire-extinguishers.component';
import {ObservationComponent} from './commponens/observation/observation.component';
import {
  FireResistantImpregnationComponent
} from './commponens/fire-resistant-impregnation/fire-resistant-impregnation.component';
import {FireHydrantComponent} from './commponens/fire-hydrant/fire-hydrant.component';
import {MaterialFileInputModule} from "ngx-material-file-input";
import {TelephonePipe} from "./pipes/telephone.pipe"


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
    TelephonePipe
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
