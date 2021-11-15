import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../auth.guard';
import {LoginComponent} from '../../pages/auth/login/login.component';
import {IndexComponent} from '../../pages/index/index.component';
import {RegisterComponent} from '../../pages/auth/register/register.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {
    path: 'dashboard',
    loadChildren: () => {
      return import(`../../pages/dashboard/dashboard.module`).then(m => m.DashboardModule);
    } // lazyloading module
  },
  {path: '**', component: IndexComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {
}
