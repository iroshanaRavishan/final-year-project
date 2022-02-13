import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { TokenStorageService } from '../token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptorService implements HttpInterceptor{

  /**
   * injecting servises
   * @param tokenStorage 
   */
  constructor(private tokenStorage: TokenStorageService) { }

  /**
   * function of intercept
   * @param req 
   * @param next 
   * @returns 
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<import("@angular/common/http").HttpEvent<any>> {
      const token = this.tokenStorage.getToken();
      const clonedRequest = req.clone({
        headers: req.headers.set("Authorization", token ? `Bearer ${token}`:"")
      });
    return next.handle(clonedRequest);
  }
}
