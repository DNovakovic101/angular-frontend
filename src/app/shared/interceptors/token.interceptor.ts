import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthBluService} from '../../logic/services';
import {catchError, switchMap, take} from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _authBluService: AuthBluService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._authBluService.isLoggedIn()) {
      request = this._setJwtHeader(request);
    }

    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && [401, 403].includes(error.status)) {
            return this._reAuthenticate(request, next);
          }

          return throwError(error);
        })
      );
  }

  private _reAuthenticate(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._authBluService.refreshToken()
      .pipe(
        take(1),
        switchMap(() => next.handle(this._setJwtHeader(request))),
        catchError(error => throwError(error))
      );
  }

  private _setJwtHeader(request): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._authBluService.getJwtToken()}`
      }
    });
  }
}
