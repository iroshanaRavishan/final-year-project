import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DesignerItems } from '@core/model/designerItemsRegistration';
import { Designer } from '@core/model/designerRegistration';
import { HShopItems } from '@core/model/hShopItemsRegistration';
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

interface DesignerItemsDto { 
  designerItems: DesignerItems;
  token: string;
}

interface HShopItemsDto { 
  hShopItems: HShop;
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

  private hShopItem$ = new Subject<HShopItems[]>();

  private designerItems$ = new Subject<DesignerItems>();
  private apiUrl = '/api/auth/';

  
  private designers: Designer[] = [];
  private hShops: HShop[] = [];

  private hShopItems: HShopItems[] = [];
  //private hShops: HShop[] = [];
 
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

  getHShopsItems() {
    this.httpClient.get<{ hShopItem: HShopItems[] }>(`${this.apiUrl}addinganitemhshop`).pipe(
      map((hShopItemsData) => {
        return hShopItemsData.hShopItem;
      })
    ).subscribe((hShopItems) => {
      this.hShopItems = hShopItems;
      this.hShopItem$.next(this.hShopItems);
    });
  }
  getHShopsItemsStream() {
    return this.hShopItem$.asObservable();
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

  loadingRelShopItemsDesigner(id: string, email: string) {
  
    return this.httpClient.post<DesignerItemsDto>(`${this.apiUrl}loadingdesigneritems`+`/${id}`, id).pipe(
      switchMap(({ designerItems}) => {
        if(designerItems==null){
          return EMPTY;
        }
          this.setDesignerItems(designerItems);// setting the user
          //console.log(`designerItems found`, designerItems);
          return of(designerItems);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e)
        return throwError(`Your login details could not be verified. Please try again!!!!`);
      })
    );
  }

  loadingRelShopItemsHShop(id: string, email: string) {
    return this.httpClient.post<HShopItemsDto>(`${this.apiUrl}loadinghshopitems`+`/${id}`, id).pipe(
      switchMap(({ hShopItems }) => {
        if(hShopItems==null){
          return EMPTY;
        }
          this.setHShopItems(hShopItems);// setting the user
          //console.log(`hShopItems found`, hShopItems);
          return of(hShopItems);
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

  updateDesigner(designer: any, id: any, ) {
    return this.httpClient.put<any>(`${this.apiUrl}updatedesigner`+`/${id}`, designer).pipe(
      switchMap(({designer, token})=> { // separating the user object to user and token from the payload
        this.setDesigner(designer); //setting the user 
        this.tokenStorage.setToken(token); //storing the user in the local storage
        console.log('designer updated successfully', designer);
        return of(designer);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    );
  }
  updateHShop(hShop: any, id: any) {
    return this.httpClient.put<any>(`${this.apiUrl}updatehshop`+`/${id}`, hShop).pipe(
      switchMap(({hShop, token})=> { // separating the user object to user and token from the payload
        this.setHShop(hShop); //setting the user 
        this.tokenStorage.setToken(token); //storing the user in the local storage
        console.log('hShop updated successfully', hShop);
        return of(hShop);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    );
  }
  
  updateDesignerUserProfilePic(designer: File[], id: any, ) {

    const designerPicsToSaveupdate = new FormData();
    designerPicsToSaveupdate.append("designerUserProfilePic", designer[0]);

    return this.httpClient.put<any>(`${this.apiUrl}updatedesigneruserprofilepics`+`/${id}`, designerPicsToSaveupdate).pipe(
      switchMap(({designer, token})=> { // separating the user object to user and token from the payload
        this.setDesigner(designer); //setting the user 
        this.tokenStorage.setToken(token); //storing the user in the local storage
        console.log('designer updated successfully', designer);
        return of(designer);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    );
  }

  updateDesignerShopProfilePic(designer: File[], id: any, ) {

    const designerPicsToSaveupdate = new FormData();
    designerPicsToSaveupdate.append("designerShopProfilePic", designer[0]);

    return this.httpClient.put<any>(`${this.apiUrl}updatedesignershopprofilepics`+`/${id}`, designerPicsToSaveupdate).pipe(
      switchMap(({designer, token})=> { // separating the user object to user and token from the payload
        this.setDesigner(designer); //setting the user 
        this.tokenStorage.setToken(token); //storing the user in the local storage
        console.log('designer updated successfully', designer);
        return of(designer);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    );
  }

  updateHShopUserProfilePic(hShop: File[], id: any, ) {

    const hShopPicsToSaveupdate = new FormData();

    hShopPicsToSaveupdate.append("hShopUserProfilePic", hShop[0]);

    return this.httpClient.put<any>(`${this.apiUrl}updatehshopuserprofilepics`+`/${id}`, hShopPicsToSaveupdate).pipe(
      switchMap(({hShop, token})=> { // separating the user object to user and token from the payload
        this.setHShop(hShop); //setting the user 
        this.tokenStorage.setToken(token); //storing the user in the local storage
        console.log('hShop updated successfully', hShop);
        return of(hShop);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    );
  }
  
  updateHShopShopProfilePic(hShop: File[], id: any, ) {

    const hShopPicsToSaveupdate = new FormData();

    hShopPicsToSaveupdate.append("hShopShopProfilePic", hShop[0]);

    return this.httpClient.put<any>(`${this.apiUrl}updatehshopshopprofilepics`+`/${id}`, hShopPicsToSaveupdate).pipe(
      switchMap(({hShop, token})=> { // separating the user object to user and token from the payload
        this.setHShop(hShop); //setting the user 
        this.tokenStorage.setToken(token); //storing the user in the local storage
        console.log('hShop updated successfully', hShop);
        return of(hShop);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    );
  }

  updatePassword(designer: any, id: any, ) {
    return this.httpClient.put<any>(`${this.apiUrl}updatedesignerpassword`+`/${id}`, designer).pipe(
      switchMap(({designer, token})=> { // separating the user object to user and token from the payload
        this.setDesigner(designer); //setting the user 
        this.tokenStorage.setToken(token); //storing the user in the local storage
        console.log('designer updated successfully', designer);
        return of(designer);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    );
  }

  updatePasswordHShop(hShop: any, id: any) {
    return this.httpClient.put<any>(`${this.apiUrl}updatehshoppassword`+`/${id}`, hShop).pipe(
      switchMap(({hShop, token})=> { // separating the user object to user and token from the payload
        this.setHShop(hShop); //setting the user 
        this.tokenStorage.setToken(token); //storing the user in the local storage
        console.log('hShop updated successfully', hShop);
        return of(hShop);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    );
  } 

  addDesignItems(item: any, discount: any, designImagesOfDesign: File[], category: any) {
    
    const itemToSave = new FormData();

    itemToSave.append("designerSystemId", item.designerSystemId);
    itemToSave.append("designerEmail", item.designerEmail);
    itemToSave.append("designerShopName", item.designerShopName);
    itemToSave.append("designerShopEmail", item.designerShopEmail);
    itemToSave.append("category", category);
    itemToSave.append("name", item.name);
    itemToSave.append("description", item.description);
    itemToSave.append("area", item.area);
    itemToSave.append("noOfFloors", item.noOfFloors);
    itemToSave.append("estCost", item.estCost);
    itemToSave.append("isDiscount", item.isDiscount);
    itemToSave.append("discount", discount);
    itemToSave.append("isGarage", item.isGarage);
    itemToSave.append("isBalcony", item.isBalcony);
    itemToSave.append("isVarenda", item.isVarenda);
    itemToSave.append("noOfBedRooms", item.noOfBedRooms);
    itemToSave.append("noOfBathRooms", item.noOfBathRooms);
    itemToSave.append("isBathRoomAttached", item.isBathRoomAttached);;
    itemToSave.append("imagesOfDesign", designImagesOfDesign[0]);
    //itemToSave.append("imagesOfDesign", imagesOfDesign[1]);

    return this.httpClient.post<any>(`${this.apiUrl}addinganitem`, itemToSave).pipe(
      switchMap(({designer, token})=> {
      this.setDesigner(designer);
      this.tokenStorage.setToken(token);
      console.log('The Item uploaded successfully', designer);
      return of(designer);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    );
  }

  addProductItems(item: any, discount: any, itemImagesOfDesign: File[], category: any, priceWithUnit: any) {

    const itemToSave = new FormData();
    itemToSave.append("hShopSystemId", item.hShopSystemId);
    itemToSave.append("hShopEmail", item.hShopEmail);
    itemToSave.append("hShopShopName", item.hShopShopName);
    itemToSave.append("hShopShopEmail", item.hShopShopEmail);
    itemToSave.append("category", category);
    itemToSave.append("name", item.name);
    itemToSave.append("description", item.description);    
    itemToSave.append("subCategory", item.subCategory);
    itemToSave.append("price", item.price);
    itemToSave.append("isDiscount", item.isDiscount);
    itemToSave.append("discount", discount);
    itemToSave.append("priceWithUnit",priceWithUnit);
    itemToSave.append("isQCPass", item.isQCPass);
    itemToSave.append("imagesOfDesign", itemImagesOfDesign[0]);
    //itemToSave.append("imagesOfDesign", itemImagesOfDesign[1]);

    return this.httpClient.post<any>(`${this.apiUrl}addinganitemhshop`, itemToSave).pipe(
      switchMap(({hShop, token})=> {
      this.setHShop(hShop);
      this.tokenStorage.setToken(token);
      console.log('The Item uploaded successfully', hShop);
      return of(hShop);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e);
        return throwError(`Registration Failed, please contact admin`);
      })
    ); 
  }

  confirmedOrderDetail(userData: File) {
    return this.httpClient.post<any>(`${this.apiUrl}confirmedorderdetails`, userData).pipe (
      switchMap(({ order }) => {
        if(order==null){
          return EMPTY;
        }
          this.setOrder(order);// setting the user
          //console.log(`order found`, order);
          return of(order);
      }),
      catchError(e => {
        this.logService.log(`Server Error Occured!: ${e.error.message}`, e)
        return throwError(`Your login details could not be verified. Please try again!!!!`);
      })
    );
  }

  validatingUser(userLogEmail: string, userLogPassword: string) {
    const loginCredentials = {userLogEmail, userLogPassword};
    return this.httpClient.post<UserDto>(`${this.apiUrl}validatinguser`, loginCredentials).pipe(
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
        return throwError(`Your login details could not be verified. Please go back and enter a valid email and password!`);
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
  private setDesignerItems(designerItems: any){
    this.designerItems$.next(designerItems);
  }
  private setHShopItems(designerItems: any){
    this.designerItems$.next(designerItems);
  }

  private setOrder(order: any){
    this.designerItems$.next(order);
  }

}
