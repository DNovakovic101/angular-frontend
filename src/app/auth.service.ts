import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean;
  private loginUrl: string;
  private refreshTokenUrl: string;

  loginBehaviorSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.loggedIn = !!this.getJwtToken() && !!this.getRefreshToken();
    this.loginUrl = `${environment.apiUrl}auth/login`;
    this.refreshTokenUrl = `${environment.apiUrl}login/refresh`;

    this.loginBehaviorSubject = new BehaviorSubject(this.loggedIn);
  }

  async login(loginData: Login): Promise<boolean> {
    return new Promise((res, rej) => {
      this.http.post<TokenData>(this.loginUrl, loginData).subscribe(data => {
        if (data?.jwt && data?.refresh) {
          localStorage.setItem('JWT_TOKEN', data.jwt);
          localStorage.setItem('REFRESH_TOKEN', data.refresh);
          this.loggedIn = true;
          this.loginBehaviorSubject.next(this.loggedIn);
          res(true);
        } else {
          rej();
        }
      },
        err => {
          console.log(err);
          rej();
        });
    });
  }

  refreshToken(): Observable<TokenData> {
    const tokenData: TokenData = {
      jwt: this.getJwtToken(),
      refresh: this.getRefreshToken()
    };

    return this.http.post<TokenData>(this.refreshTokenUrl, tokenData).pipe(tap(newToken => {
      localStorage.setItem('JWT_TOKEN', newToken.jwt);
    }, err => {
      this.logout();
    }));
  }

  logout(): void {
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    this.loggedIn = false;
    this.loginBehaviorSubject.next(this.loggedIn);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getJwtToken(): string {
    return localStorage.getItem('JWT_TOKEN');
  }

  getRefreshToken(): string {
    return localStorage.getItem('REFRESH_TOKEN');
  }
}

interface Login {
  email: string;
  password: string;
}

interface TokenData {
  jwt: string;
  refresh: string;
}
