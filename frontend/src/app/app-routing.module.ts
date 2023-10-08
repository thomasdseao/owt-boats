import {NgModule} from '@angular/core';
import {RouterModule, Routes, TitleStrategy} from '@angular/router';
import {LoginComponent} from "./component/authentication/login/login.component";
import {CreateComponent} from "./component/dashboard/boats/create/create.component";
import {UpdateComponent} from "./component/dashboard/boats/update/update.component";
import {ListComponent} from "./component/dashboard/boats/list/list.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {HomeComponent} from "./component/dashboard/home/home.component";
import {TemplatePageTitleStrategy} from "./utils/template-page-title-strategy";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/authentication/login', pathMatch: 'full'},
  {
    path: 'authentication',
    children: [
      {path: 'login', component: LoginComponent},
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: HomeComponent, title: 'Dashboard'},
      {
        path: 'boats',
        children: [
          {path: 'create', component: CreateComponent, title: 'Create a boat'},
          {path: 'update', component: UpdateComponent, title: 'Update boat'},
          {path: 'list', component: ListComponent, title: 'List boats'}
        ]
      }
    ]
  },
  {path: '**', redirectTo: '/authentication/login'}  // wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy
    }
  ]
})
export class AppRoutingModule {
}
