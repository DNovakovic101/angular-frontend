import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InputNumberModule} from 'primeng/inputnumber';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {CarouselModule} from 'primeng/carousel';
import {DividerModule} from 'primeng/divider';
import {ProgressBarModule} from 'primeng/progressbar';
import {MenuModule} from 'primeng/menu';
import {ToggleButtonModule} from 'primeng/togglebutton';

const primeModules = [
  InputTextModule,
  ButtonModule,
  CardModule,
  FieldsetModule,
  MenubarModule,
  ToastModule,
  DropdownModule,
  InputSwitchModule,
  ProgressSpinnerModule,
  InputNumberModule,
  PanelModule,
  TableModule,
  SliderModule,
  DialogModule,
  CarouselModule,
  DividerModule,
  ProgressBarModule,
  MenuModule,
  ToggleButtonModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...primeModules
  ],
  exports: [
    ...primeModules
  ]
})
export class PrimeNGModule { }
