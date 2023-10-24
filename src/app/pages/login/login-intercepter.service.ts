import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { LoginService } from './login.service';
import { exhaustMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginIntercepterService implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.loginService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', user?.token!),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
