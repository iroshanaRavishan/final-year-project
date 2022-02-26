import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/model/userRegistration';
import { Designer } from '@core/model/designerRegistration';
import { HShop } from '@core/model/hShopRegistration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{

  user: User | any;
  designer: Designer | any;
  hShop: HShop | any;
  
  userSubscription: Subscription | any;
  designerSubscription: Subscription | any;
  hShopSubscription: Subscription | any;

  public searchTerm: string = "";

  constructor(private router: Router, private authService: AuthService) { 
    this.authService.findMe().subscribe(user => (this.user = user));
    this.userSubscription = this.authService.user.subscribe(user => (this.user = user));
    
    this.designerSubscription = this.authService.designer.subscribe(designer => (this.designer = designer));

    this.hShopSubscription = this.authService.hShop.subscribe(hShop => (this.hShop = hShop));
  }
  search(event: any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/'])
  }
  
  ngOnDestroy(): void {
    if((this.userSubscription)||(this.designerSubscription)||(this.hShopSubscription)){
      if(this.userSubscription){
        this.userSubscription.unsubscribe();
      }
      else if(this.designerSubscription){
        this.designerSubscription.unsubscribe();
      }
      else if(this.hShopSubscription){
        this.hShopSubscription.unsubscribe();
      }
    }
  }
}

