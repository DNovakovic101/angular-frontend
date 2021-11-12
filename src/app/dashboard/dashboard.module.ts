import { TokenInterceptor } from './token.interceptor';
import { DashboardService } from './dashboard.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DashboardGuard } from './dashboard.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AccountComponent } from './account/account.component';
import { MenuModule } from 'primeng/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {CarouselModule} from 'primeng/carousel';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';


const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'account', component: AccountComponent }, 
      //{ path: 'other', component: other component or wathever }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, AccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    ButtonModule,
    HttpClientModule,
    InputTextModule,
    InputNumberModule,
    FieldsetModule,
    PanelModule,
    ProgressSpinnerModule,
    TableModule,
    SliderModule,
    DialogModule,
    CarouselModule,
    InputSwitchModule,
    DividerModule,
    DropdownModule,
    ProgressBarModule
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
export class DashboardModule { }
