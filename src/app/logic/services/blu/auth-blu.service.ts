import {Injectable} from '@angular/core';
import {AuthApiService} from '../api/auth-api.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {LoginDto, RegisterDto, TokenDto, ApiResponse} from '../../entities';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {JwtEnum} from '../../enums';
import {AccountApiService} from '../api/account-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthBluService {

  private readonly _loggedIn: BehaviorSubject<boolean>;

  get loggedIn() {
    return this._loggedIn;
  }

  constructor(
    private _authApiService: AuthApiService,
    private _accountApiService: AccountApiService
  ) {
    this._loggedIn = new BehaviorSubject(false);
  }

  public logIn(loginData: LoginDto): Observable<ApiResponse<TokenDto>> {
    return this._authApiService.login(loginData)
      .pipe(
        take(1),
        tap(({data}) => {
          const {jwt, refresh} = data;
          if (jwt && refresh) {
            localStorage.setItem(JwtEnum.JWT, jwt);
            localStorage.setItem(JwtEnum.REFRESH_TOKEN, refresh);
            this._loggedIn.next(true);
          }
        })
      );
  }

  public register(registerData: RegisterDto): Observable<ApiResponse<number>> {
    return this._authApiService.register(registerData)
      .pipe(
        take(1),
        switchMap(response => {
          const {data} = response;
          if (data === -1 || data === null || data === undefined) {
            return of(response);
          }

          const loginData: LoginDto = {
            email: registerData.email,
            password: registerData.password
          };

          return this.logIn(loginData)
            .pipe(
              take(1),
              tap(({data}) => {
                const {jwt, refresh} = data;
                if (jwt && refresh) {
                  localStorage.setItem(JwtEnum.JWT, jwt);
                  localStorage.setItem(JwtEnum.REFRESH_TOKEN, refresh);
                  this._loggedIn.next(true);
                }
              }),
              map(() => response)
            );
        })
      );
  }

  public refreshToken(): Observable<TokenDto> {
    const tokenData: TokenDto = {
      jwt: this.getJwtToken(),
      refresh: this.getRefreshToken()
    };

    return this._authApiService.refreshToken(tokenData)
      .pipe(
        take(1),
        map(({data}) => data),
        tap(({jwt}) => {
          localStorage.setItem(JwtEnum.JWT, jwt);
          this._loggedIn.next(true);
        }, () => {
          this.logOut();
        })
      );
  }


  public autoLogIn() {
    if (localStorage.getItem(JwtEnum.JWT) && localStorage.getItem(JwtEnum.REFRESH_TOKEN)) {
      this._loggedIn.next(true);
    }
  }

  public getJwtToken(): string {
    return localStorage.getItem(JwtEnum.JWT);
  }

  public getRefreshToken(): string {
    return localStorage.getItem(JwtEnum.REFRESH_TOKEN);
  }

  public isLoggedIn(): boolean {
    return this._loggedIn.value;
  }

  public logOut(): void {
    localStorage.removeItem(JwtEnum.JWT);
    localStorage.removeItem(JwtEnum.REFRESH_TOKEN);
    this._loggedIn.next(false);
  }
}
