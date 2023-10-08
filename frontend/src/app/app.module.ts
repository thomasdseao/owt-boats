import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/authentication/login/login.component';
import {ListComponent} from './component/dashboard/boats/list/list.component';
import {CreateComponent} from './component/dashboard/boats/create/create.component';
import {UpdateComponent} from './component/dashboard/boats/update/update.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {HomeComponent} from './component/dashboard/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./auth.guard";
import {AuthenticationService} from "./service/authentication.service";
import {AuthInterceptor} from "./utils/auth.interceptor";
import {ConfirmDangerComponent} from './component/dashboard/shared/modal/confirm-danger/confirm-danger.component';
import {ErrorInterceptor} from "./utils/error.interceptor";
import {DetailsComponent} from "./component/dashboard/boats/details/details.component";
import {ToastService} from "./service/toast.service";
import {ToastComponent} from './component/dashboard/shared/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    CreateComponent,
    UpdateComponent,
    DashboardComponent,
    HomeComponent,
    ConfirmDangerComponent,
    CreateComponent,
    UpdateComponent,
    CreateComponent,
    DetailsComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    ToastService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
