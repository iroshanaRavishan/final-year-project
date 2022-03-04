import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Designer } from '@core/model/designerRegistration';
import { HShop } from '@core/model/hShopRegistration';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { LogService } from '../../core-logs/log.service';
import { User } from '../model/userRegistration';
import { TokenStorageService } from './token-storage.service';

// creating a common interface for the user object
interface UserDto { 
  user: User;
  token: string;
}

interface DesignerDto { 
  designer: Designer;
  token: string;
}

interface HShopDto { 
  hShop: HShop;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private user$ = new Subject<User>();
  private designer$ = new Subject<Designer>();
  private hShop$ = new Subject<HShop>();
  
  private apiUrl = '/api/auth/';

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService, private logService: LogService) { }
  

  userLogin(userLogEmail: string, userLogPassword: string) {
    const loginCredentials = {userLogEmail, userLogPassword};
    console.log('login credential', loginCredentials);

    return this.httpClient.post<UserDto>(`${this.apiUrl}loginuser`, loginCredentials).pipe(
      switchMap(({ user, token }) => {
        if(user==null){
          return EMPTY;
        }
          this.setUser(user);// setting the user
          this.tokenStorage.setToken(token); //storing the user in the local storage
          console.log(`user found`, user);
          return of(user);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e)
        return throwError(`Your login details could not be verified. Please try again!!!!`);
      })
    );
  }

  designerLogin(designerLogEmail: string, designerLogPassword: string) {
    const loginCredentials = {designerLogEmail, designerLogPassword};
    console.log('login credential', loginCredentials);

    return this.httpClient.post<DesignerDto>(`${this.apiUrl}logindesigner`, loginCredentials).pipe(
      switchMap(({ designer, token }) => {
        if(designer==null){
          return EMPTY;
        }
          this.setDesigner(designer);// setting the user
          this.tokenStorage.setToken(token); //storing the user in the local storage
          console.log(`designer found`, designer);
          return of(designer);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e)
        return throwError(`Your login details could not be verified. Please try again!!!!`);
      })
    );
  }

  hShopLogin(hShopLogEmail: string, hShopLogPassword: string) {
    const loginCredentials = {hShopLogEmail, hShopLogPassword};
    console.log('login credential', loginCredentials);

    return this.httpClient.post<HShopDto>(`${this.apiUrl}loginhshop`, loginCredentials).pipe(
      switchMap(({ hShop, token }) => {
        if(hShop==null){
          return EMPTY;
        }
          this.setHShop(hShop);// setting the user
          this.tokenStorage.setToken(token); //storing the user in the local storage
          console.log(`shop found`, hShop);
          return of(hShop);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e)
        return throwError(`Your login details could not be verified. Please try again!!!!`);
      })
    );
  }


  // function of logout
  logout(){ 
    this.tokenStorage.removeToken();  //remove token from local storage
    this.setUser(null);
    this.setDesigner(null);
    this.setHShop(null);  //remove user form subject
    console.log('the user has logged out successfully');
  }

  get user(){
    return this.user$.asObservable();
  }

  get designer(){
    return this.designer$.asObservable();
  }

  get hShop(){
    return this.hShop$.asObservable();
  }

  userRegistration(user: any, image: File) {
    const userToSave = new FormData();

    userToSave.append("userRegUsername", user.userRegUsername);
    userToSave.append("userRegEmail", user.userRegEmail);
    userToSave.append("userRegPassword", user.userRegPassword);
    userToSave.append("userRegConfirmPassword", user.userRegConfirmPassword);
    userToSave.append("userRegProfilePic", image);
    userToSave.append("userRegTelephone", user.userRegTelephone);
    userToSave.append("userRegAddress", user.userRegAddress);
    userToSave.append("userRegDistrict", user.userRegDistrict);
   
    return this.httpClient.post<any>(`${this.apiUrl}registeruser`, userToSave).pipe(
      switchMap(({user, token})=> { // separating the user object to user and token from the payload
        this.setUser(user); //setting the user 
        this.tokenStorage.setToken(token); //storing the user in the local storage
        console.log('user registered successfully', user);
        return of(user);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    );
  }

  designerRegistration(designerToSave: any) {
    return this.httpClient.post<any>(`${this.apiUrl}registerdesigner`, designerToSave).pipe(
      switchMap(({designer, token})=> { // separating the user object to user and token from the payload
        this.setDesigner(designer); //setting the user 
        this.tokenStorage.setToken(token); //storing the user in the local storage
        console.log('designer registered successfully', designer);
        return of(designer);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    );
  }

  hShopRegistration(hShopToSave: any) {
    return this.httpClient.post<any>(`${this.apiUrl}registerhshop`, hShopToSave).pipe(
      switchMap(({hShop, token})=> { // separating the user object to user and token from the payload
        this.setHShop(hShop); //setting the user 
        this.tokenStorage.setToken(token); //storing the user in the local storage
        console.log('shop registered successfully', hShop);
        return of(hShop);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e);
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
    );
  }

  private setUser(user: any){
    this.user$.next(user);
  }
  private setDesigner(designer: any){
    this.designer$.next(designer);
  }
  private setHShop(hShop: any){
    this.hShop$.next(hShop);
  }
}
