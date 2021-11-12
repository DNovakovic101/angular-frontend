import { MenuItem } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="grid-container">
      <div class="submenu">
        <p-menu [model]="items"></p-menu>
      </div>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        items: [
          {
            label: 'Account',
            icon: 'pi pi-table',
            routerLink: ['account'],
            // disabled: true | false
          },
          {
            label: 'Other',
            icon: 'pi pi-sitemap',
            routerLink: ['other'],
            // disabled: true | false
          },
        ],
      },
    ];
  }
}
