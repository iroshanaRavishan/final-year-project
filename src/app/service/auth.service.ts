import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';

export interface User{
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  confirmpassword: string,
  telephone: string,
  address: string,
  district: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private user$ = new Subject<User>();
  constructor() { }

  get user(){
    return this.user$.asObservable();
  }
  userRegistration(user: any) {
    this.user$.next(user);
    return of(user);
  }

  userLogin(userEmail: string, userPassword: string) {
    const loginCredentials = {userEmail, userPassword};
    console.log('login credential', loginCredentials);
    return of({userEmail, userPassword});
  }

  designerLogin(designerEmail: string, designerPassword: string) {
    const loginCredentials = {designerEmail, designerPassword};
    console.log('login credential', loginCredentials);
    return of({designerEmail, designerPassword});
  }

  shopLogin(shopEmail: string, shopPassword: string) {
    const loginCredentials = {shopEmail, shopPassword};
    console.log('login credential', loginCredentials);
    return of({shopEmail, shopPassword});
  }
 
}
