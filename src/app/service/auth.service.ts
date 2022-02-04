import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { User } from '../model/userRegistration';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private user$ = new Subject<User>();
  private apiUrl = '/api/auth/';
  constructor(private httpClient: HttpClient) { }

  logout(){
    //remove user form subject
    this.setUser(null);
    console.log('the user has logged out successfully');
  }

  get user(){
    return this.user$.asObservable();
  }




  userLogin(userLogUsername: string, userLogPassword: string) {
    const loginCredentials = {userLogUsername, userLogPassword};
    console.log('login credential', loginCredentials);

    return this.httpClient.post<User>(`${this.apiUrl}login`, loginCredentials).pipe(
      switchMap(foundUser => {
        this.setUser(foundUser);
        console.log(`user found`, foundUser);
        return of(foundUser);
      }),
      catchError(e => {
        console.log(`Your login details could not be verified. Please try again!`, e);
        return throwError(`Your login details could not be verified. Please try again!`);
      })
    );
  }

//    designerLogin(designerEmail: string, designerPassword: string) {  //same as bellow******
//      const loginCredentials = {designerEmail, designerPassword};
//      console.log('login credential', loginCredentials);
//      return of(designerEmail, designerPassword);
//    }

//    shopLogin(shopEmail: string, shopPassword: string) { //there is not a shopEmail, shopPassword here it has been changed
//      const loginCredentials = {shopEmail, shopPassword};
//      console.log('login credential', loginCredentials);
//      return of(shopEmail, shopPassword);
//  }

   userRegistration(user: any) {
    // //maske a api call to save the user in the database
    // //update the user subject
    // this.setUser(user);
    // console.log('registered the user successfully', user);
    // return of(user);


    return this.httpClient.post<User>(`${this.apiUrl}register`, user).pipe(
      switchMap(savedUser=> {
        this.setUser(savedUser);
        console.log('user registered successfully', savedUser);
        return of(savedUser);
      }),
      catchError(e => {
        console.log(`server error occured`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    );
  }

  private setUser(user: any){
    this.user$.next(user);
  }
 
}
