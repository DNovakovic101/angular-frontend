import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { catchError, map, switchAll, switchMap } from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private http: HttpClient) { }

  /*handle(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        tap(
          data => {
            console.warn('request ok => ', data);
          },
          error => {
            if (error.status === 403) {
              this.authService.refreshToken().subscribe(token => {
                localStorage.setItem('JWT_TOKEN', token);
                console.warn('refresh token ok!');
                next.handle(this.setJwtHeader(request));
              }, err => {
                return throwError(err);
              });
            } else {
              return throwError(error);
            }
          }
        )
      );
  }*/

  // refresh(tokenData: object, request: HttpRequest<any>, next: HttpHandler): Observable<any> {
  //   return this.http.post<string>('http://localhost:3001/login/refresh', tokenData).pipe(
  //     map(token => {
  //       localStorage.setItem('JWT_TOKEN', token);
  //       next.handle(this.setJwtHeader(request));
  //       return true;
  //     }, err => {
  //       throwError(err);
  //     }
  //     ));
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      request = this.setJwtHeader(request);
    }


    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 403) {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              return next.handle(this.setJwtHeader(request));
            })
          );

          /*const tokenData = {
            jwt: this.authService.getJwtToken(),
            refresh: this.authService.getRefreshToken()
          };*/

          // return this.authService.refreshToken()
          //   .switchMap((data: any) => {
          //     return next.handle(request);
          //   })
          //   .catch((err: any) => {
          //     this.authService.logout();
          //     return throwError(err);
          //   });
          //return this.refresh(tokenData, request, next);
          /*return this.handleRefresh(request, next).su(data => {
            return next.handle(request);
          });*/

          //return next.handle(request);
          //return this.handleRefresh(request, next);
        } else {
          return throwError(error);
        }
      })
    );


    //return this.handle(request, next);

    /*
        const result = next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 403) {
    */

    /*return this.authService.refreshToken().subscribe(
      data => next.handle(this.setJwtHeader(request)), err => throwError(err)
    );*/


    //refresh token
    //(async () => {
    //return this.handleRefresh(request, next);
    /*this.authService.refreshToken().pipe(
      switchMap(data => {
        localStorage.setItem('JWT_TOKEN', data.jwt);
        return next.handle(this.setJwtHeader(request));
      })
      , err => {
        return throwError(err);
      });*/

    /*try {
      //await this.authService.refreshToken();//.then(e => {
      //request = this.setJwtHeader(request);
      //return next.handle(request);
      //});
    } catch (err) {
      return throwError(err);
    }*/
    //})();

    /*  } else {
        return throwError(error);
      }
    }));*/


  }

  handleRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //return (async ()=>{
    //this.authService.refreshToken();
    //request = this.setJwtHeader(request);
    return next.handle(request);
    //})();
    // return this.authService.refreshToken().subscribe(data => {
    //     //localStorage.setItem('JWT_TOKEN', data.jwt);
    //     return next.handle(this.setJwtHeader(request));
    //   }
    //   , err => {
    //     return throwError(err);
    //   });
  }

  setJwtHeader(request): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    });
  }
}
