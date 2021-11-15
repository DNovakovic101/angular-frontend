import {NgModule} from '@angular/core';
import {AuthApiService, AuthBluService} from './services';

const apiServices = [
  AuthApiService
];

const bluServices = [
  AuthBluService
];

@NgModule({
  providers: [
    ...apiServices,
    ...bluServices
  ]
})
export class LogicModule {}
