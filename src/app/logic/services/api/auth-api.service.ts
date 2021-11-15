import {AbstractApiService} from './abstract-api.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginDto, RegisterDto, TokenDto, ApiResponse} from '../../entities';


@Injectable()
export class AuthApiService extends AbstractApiService {

  constructor(
    protected httpClient: HttpClient
  ) {
    super(httpClient, 'auth/');
  }

  public login(params: LoginDto): Observable<ApiResponse<TokenDto>> {
    return this.httpClient.post<ApiResponse<TokenDto>>(this.apiEndpoint + 'login', params);
  }

  public refreshToken(params: TokenDto): Observable<ApiResponse<TokenDto>> {
    return this.httpClient.post<ApiResponse<TokenDto>>(this.apiEndpoint + 'login/refresh', params);
  }

  public register(params: RegisterDto): Observable<ApiResponse<number>> {
    return this.httpClient.post<ApiResponse<number>>(this.apiEndpoint + 'register', params);
  }

}





