// import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';


export class AccountDetailsDto {
  id?: number;
  firstname: string;
  lastname: string;
  street: string;
  codePostale: number;
  city: string;
  //image?: Buffer;
}


@Injectable()
export class DashboardService {

  private accountDataUrl: string;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.accountDataUrl = `${environment.apiUrl}dashboard/account`;
  }

  async loadAccountDetails(): Promise<AccountDetailsDto> {
    return this.http.get<AccountDetailsDto>(`${this.accountDataUrl}`).toPromise();
  }

  saveAccountDetails(accountData: AccountDetailsDto): Observable<number> {
    return of(Math.round(Math.random() * 10_000) + 1); // return pseude inserted id...
  }

}

