import {MenuItem} from 'primeng/api';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  labelDashboard;
  labelOther;

  translateSubscription: Subscription;
  translatePopulateSubscription: Subscription;
  items: MenuItem[] = [
    {
      label: '',
      items: [
        {
          label: '',
          icon: 'pi pi-table',
          routerLink: ['account'],
          // disabled: true | false
        },
        {
          label: '',
          icon: 'pi pi-sitemap',
          routerLink: ['other'],
          // disabled: true | false
        },
      ],
    },
  ];

  constructor(private _translateService: TranslateService) {
  }

  ngOnDestroy() {
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
    }
    if (this.translatePopulateSubscription) {
      this.translatePopulateSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.translatePopulateSubscription = this._translateService.get(['MENU_ITEMS.DASHBOARD', 'MENU_ITEMS.OTHER']).subscribe(labels => {
      this.labelDashboard = labels['MENU_ITEMS.DASHBOARD'];
      this.labelOther = labels['MENU_ITEMS.OTHER'];
      this.populateItems();
    });
    this.translateSubscription = this._translateService.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      this.labelDashboard = event.translations?.MENU_ITEMS?.DASHBOARD;
      this.labelOther = event.translations?.MENU_ITEMS?.OTHER;
      this.populateItems();
    });
  }

  populateItems() {
    this.items = [
      {
        label: this.labelDashboard,
        items: [
          {
            label: this.labelDashboard,
            icon: 'pi pi-table',
            routerLink: ['account'],
            // disabled: true | false
          },
          {
            label: this.labelOther,
            icon: 'pi pi-sitemap',
            routerLink: ['other'],
            // disabled: true | false
          },
        ],
      },
    ];
  }

}
