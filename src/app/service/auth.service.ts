import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { User } from '../model/userRegistration';
import { TokenStorageService } from '../token-storage.service';

// creating a common interface for the user object
interface UserDto { 
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private user$ = new Subject<User>();
  private apiUrl = '/api/auth/';

  /**
   * injecting servise
   * @param httpClient 
   * @param tokenStorage 
   */
  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) { }
  
  /**
   * function of user login
   * @param userLogUsername 
   * @param userLogPassword 
   * @returns 
   */
  userLogin(userLogUsername: string, userLogPassword: string) {
    const loginCredentials = {userLogUsername, userLogPassword};
    console.log('login credential', loginCredentials);

    return this.httpClient.post<UserDto>(`${this.apiUrl}login`, loginCredentials).pipe(
      switchMap(({ user, token }) => {
        this.setUser(user);// setting the user
        this.tokenStorage.setToken(token); //storing the user in the local storage
        console.log(`user found`, user);
        return of(user);
      }),
      catchError(e => {
        console.log(`Your login details could not be verified. Please try again!`, e);
        return throwError(`Your login details could not be verified. Please try again!`);
      })
    );
  }

  // function of logout
  logout(){ 
    this.tokenStorage.removeToken();  //remove token from local storage
    this.setUser(null);  //remove user form subject
    console.log('the user has logged out successfully');
  }

  get user(){
    return this.user$.asObservable();
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

  //  userRegistration(user: any) {                          **** THE PREVIOUS ONE OF REGISTER METHOD ****
  //   // //maske a api call to save the user in the database
  //   // //update the user subject
  //   // this.setUser(user);
  //   // console.log('registered the user successfully', user);
  //   // return of(user);


  //   return this.httpClient.post<User>(`${this.apiUrl}register`, user).pipe(
  //     switchMap(savedUser=> {
  //       this.setUser(savedUser);
  //       console.log('user registered successfully', savedUser);
  //       return of(savedUser);
  //     }),
  //     catchError(e => {
  //       console.log(`server error occured`, e);
  //       return throwError(`Registration Failed, please contact admin`);
  //     })
  //   );
  // }

  /**
   * function of user registration
   * @param userToSave 
   * @returns 
   */
  userRegistration(userToSave: any) {
    return this.httpClient.post<any>(`${this.apiUrl}register`, userToSave).pipe(
      switchMap(({user, token})=> { // separating the user object to user and token from the payload
        this.setUser(user); //setting the user 
        this.tokenStorage.setToken(token); //storing the user in the local storage
        console.log('user registered successfully', user);
        return of(user);
      }),
      catchError(e => {
        console.log(`server error occured`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    );
  }

  //when the browser refresh, this will take care of that
  findMe() { 
    const token = this.tokenStorage.getToken();
    if(!token) { //checking the token whether stored in the local storage
      return EMPTY; //when refreshing, it return an Empty. Otherwise it returns undifine 
    }

    return this.httpClient.get<any>(`${this.apiUrl}findme`).pipe(
      switchMap(({ user }) => {
        this.setUser(user); //setting the user 
        console.log(`user found`, user);
        return of(user);
      }),
      catchError(e => {
        console.log(`Yourrrrrrrrrrrrr login details could not be verified. Please try again!`, e);
        return throwError(`Yourrrrrrrrrrrrrr login details could not be verified. Please try again!`);
      })
    );
  }

  /**
   * function of setting the user on the naigation bar
   * @param user 
   */
  private setUser(user: any){
    this.user$.next(user);
  }
}
