import { AuthGuard } from './auth.guard';
import { My404Component } from './my404/my404.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { NavigationComponent } from './navigation.component';

import { MenubarModule } from 'primeng/menubar';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';



const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'info', component: InfoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    loadChildren: () => {
      return import(`./dashboard/dashboard.module`).then(m => m.DashboardModule);
    } // lazyloading module
  },
  { path: '**', component: My404Component }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavigationComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    MenubarModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
