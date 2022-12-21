import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {NgModule} from '@angular/core';

import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {SpinnerComponent} from "./modules/admin/shared/spinner.component";
import {NotFoundComponent} from './layout/not-found/not-found.component';
import {DATE_FORMATS} from "./modules/admin/pipes/date.format";
import {MainInterceptor} from "./main.interceptor";
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    NotFoundComponent,
    SpinnerComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      multi:true,
      useClass:MainInterceptor
    },
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
