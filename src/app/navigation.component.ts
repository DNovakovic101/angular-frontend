import { MenuItem } from 'primeng/api';
import { AuthService } from './auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  template: `
  <p-menubar [model]="items" class="nav-menu">
    <button *ngIf="!loginService.isLoggedIn()" pButton label="Login" class="border-0" routerLink="/login" icon="pi pi-sign-in"></button>
    <button *ngIf="!loginService.isLoggedIn()" pButton label="Registration" class="p-button-secondary border-0 p-ml-2" routerLink="/registration" icon="pi pi-user"></button>
    <button *ngIf="loginService.isLoggedIn()" pButton label="Logout" class="p-button-secondary border-0" routerLink="/" icon="pi pi-power-off" (click)="loginService.logout()"></button>
  </p-menubar>
  `,
  styles: [`
    .border-0 {
      border-radius: 0;
    }
  `]
})
export class NavigationComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  loginBehaviorSubjectSubscription: Subscription;

  constructor(public loginService: AuthService) { }

  ngOnDestroy(): void {
    this.loginBehaviorSubjectSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loginBehaviorSubjectSubscription = this.loginService.loginBehaviorSubject.subscribe(isLoggedIn => {
      this.initMenu(isLoggedIn);
    });
  }

  initMenu(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.items = [
        {
          label: 'dashboard',
          routerLink: ['/dashboard']
        }
      ];
    } else {
      this.items = [
        {
          label: 'Info',
          icon: 'pi pi-info-circle',
          routerLink: ['/info']
        },
      ];
    }
  }

}
