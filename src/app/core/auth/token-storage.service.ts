import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  TOKEN_KEY = "ProductMart.AuthToekn";

  constructor() { }

  /**
   * storing the user in the local storage
   * @param token 
   * @returns 
   */
  setToken(token: string) {
    if(!token){
      return;
    }
    this.removeToken();
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }
  
  // function of taking the user
  getToken(){ 
    return window.localStorage.getItem(this.TOKEN_KEY);
  }

  // functoion of removing the user
  removeToken(){ 
    window.localStorage.removeItem(this.TOKEN_KEY);
  }
}
