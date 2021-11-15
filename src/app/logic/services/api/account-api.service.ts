import {AbstractApiService} from './abstract-api.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDetailsDto} from '../../entities';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService extends AbstractApiService {

  constructor(
    protected httpClient: HttpClient
  ) {
    super(httpClient, 'dashboard/account');
  }

  public getUserDetails(jwtToken): Observable<UserDetailsDto> {
    // Had problems with token not being added on refresh becouse method is called from app.component
    // Just a reminder for future refactoring without manually adding auth header
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get<UserDetailsDto>(this.apiEndpoint, httpOptions);
  }
}





