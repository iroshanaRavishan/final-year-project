import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Designer } from '@core/model/designerRegistration';
import { HShop } from '@core/model/hShopRegistration';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
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
  private designers$ = new Subject<Designer[]>();

  private hShop$ = new Subject<HShop>();
  private hShops$ = new Subject<HShop[]>();
  private apiUrl = '/api/auth/';

  
  private designers: Designer[] = [];
  private hShops: HShop[] = [];
 
  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService, private logService: LogService) { }
  
  getDesigners() {
    this.httpClient.get<{ designers: Designer[] }>(`${this.apiUrl}registerdesigner`).pipe(
      map((designerData) => {
        return designerData.designers;
      })
    ).subscribe((designers) => {
      this.designers = designers;
      this.designers$.next(this.designers);
    });
  }
  getDesignersStream() {
    return this.designers$.asObservable();
  }

  getHShops() {
    this.httpClient.get<{ hShops: HShop[] }>(`${this.apiUrl}registerhshop`).pipe(
      map((hShopData) => {
        return hShopData.hShops;
      })
    ).subscribe((hShops) => {
      this.hShops = hShops;
      this.hShops$.next(this.hShops);
    });
  }
  getHShopsStream() {
    return this.hShops$.asObservable();
  }

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

  designerRegistration(designer: any, imgFiles: File[]) {
    const designerToSave = new FormData();

    designerToSave.append("designerRegUsername", designer.designerRegUsername);
    designerToSave.append("designerRegEmail", designer.designerRegEmail);
    designerToSave.append("designerRegNIC", designer.designerRegNIC);
    designerToSave.append("designerRegPassword", designer.designerRegPassword);
    designerToSave.append("designerRegConfirmPassword", designer.designerRegConfirmPassword);
    designerToSave.append("designerRegProfilePics", imgFiles[0]);
    designerToSave.append("designerRegTelephone", designer.designerRegTelephone);
    designerToSave.append("designerRegAddress", designer.designerRegAddress);
    designerToSave.append("designerRegDistrict", designer.designerRegDistrict);
    designerToSave.append("designerRegShopName", designer.designerRegShopName);
    designerToSave.append("designerRegShopDesc", designer.designerRegShopDesc);
    designerToSave.append("designerRegShopEmail", designer.designerRegShopEmail);
    designerToSave.append("designerRegShopAddress", designer.designerRegShopAddress);
    designerToSave.append("designerRegShopDistrict", designer.designerRegShopDistrict);
    designerToSave.append("designerRegShopPostalCode", designer.designerRegShopPostalCode);
    designerToSave.append("designerRegShopLocation", designer.designerRegShopLocation);
    designerToSave.append("designerRegShopTelephone", designer.designerRegShopTelephone);
    designerToSave.append("designerRegProfilePics", imgFiles[1]);
    designerToSave.append("designerRegPricing", designer.designerRegPricing);

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

  hShopRegistration(hShop: any, imgFiles: File[]) {
    const hShopToSave = new FormData();

    hShopToSave.append("hShopRegUsername", hShop.hShopRegUsername);
    hShopToSave.append("hShopRegEmail", hShop.hShopRegEmail);
    hShopToSave.append("hShopRegNIC", hShop.hShopRegNIC);
    hShopToSave.append("hShopRegPassword", hShop.hShopRegPassword);
    hShopToSave.append("hShopRegConfirmPassword", hShop.hShopRegConfirmPassword);
    hShopToSave.append("hShopRegProfilePics", imgFiles[0]);
    hShopToSave.append("hShopRegTelephone", hShop.hShopRegTelephone);
    hShopToSave.append("hShopRegAddress", hShop.hShopRegAddress);
    hShopToSave.append("hShopRegDistrict", hShop.hShopRegDistrict);
    hShopToSave.append("hShopRegShopName", hShop.hShopRegShopName);
    hShopToSave.append("hShopRegShopDesc", hShop.hShopRegShopDesc);
    hShopToSave.append("hShopRegShopEmail", hShop.hShopRegShopEmail);
    hShopToSave.append("hShopRegShopAddress", hShop.hShopRegShopAddress);
    hShopToSave.append("hShopRegShopDistrict", hShop.hShopRegShopDistrict);
    hShopToSave.append("hShopRegShopPostalCode", hShop.hShopRegShopPostalCode);
    hShopToSave.append("hShopRegShopLocation", hShop.hShopRegShopLocation);
    hShopToSave.append("hShopRegShopTelephone", hShop.hShopRegShopTelephone);
    hShopToSave.append("hShopRegProfilePics", imgFiles[1]);
    hShopToSave.append("hShopRegPricing", hShop.hShopRegPricing);

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
