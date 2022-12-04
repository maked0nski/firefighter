import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import {AdminCheckService} from "./services";
import {AdminResolverService} from "./modules/admin/service/resolve";

const routes: Routes = [

  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', loadChildren: () => import('./modules').then(m => m.LoginModule)},
      {
        path: 'admin', loadChildren: () => import('./modules').then(m => m.AdminModule),
        canActivate: [AdminCheckService],
        data: {role: "ADMIN"},
        resolve: {user: AdminResolverService},
      },
      {path: 'register', loadChildren: () => import('./modules').then(m => m.RegisterModule)},
    ]
  },
  {path: '**', component: NotFoundComponent}

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
