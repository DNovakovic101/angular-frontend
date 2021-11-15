import {TokenInterceptor} from '../../shared/interceptors/token.interceptor';
import {DashboardService} from './dashboard.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {DashboardGuard} from './dashboard.guard';
import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {AccountComponent} from './account/account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimeNGModule} from '../../shared/prime-ng/prime-ng.module';
import {TranslateModule} from '@ngx-translate/core';
import {NavigationComponent} from '../../components/navigation/navigation.component';


const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    children: [
      {path: '', redirectTo: 'account', pathMatch: 'full'},
      {path: 'account', component: AccountComponent},
      // { path: 'other', component: other component or wathever }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, AccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DashboardService,
    DashboardGuard,
  ]
})
export class DashboardModule {
}
