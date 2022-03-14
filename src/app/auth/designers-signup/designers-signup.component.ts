import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/auth/auth.service';
import { Designer } from '@core/model/designerRegistration';
import { Subscription } from 'rxjs';


declare const toggling: any;
declare const activatingLinks: any;

@Component({
  selector: 'app-designers-signup',
  templateUrl: './designers-signup.component.html',
  styleUrls: ['./designers-signup.component.css']
})
export class DesignersSignupComponent implements OnInit {

  //designers: Designer | any;
  designer: any;
  compo: string ="dashboard";
  designerId: any;
  
  userSubscription: Subscription | any;
  designerSubscription: Subscription | any;
  hShopSubscription: Subscription | any;

  constructor(private authService: AuthService) { 
    this.authService.findMe().subscribe(designers => (this.designer = designers));
    this.designerSubscription = this.authService.designer.subscribe(designers => (this.designer = designers));

  }

  callToggling() {
    toggling();
  }
  callActivating(comp: string, id:any){
      this.compo = comp;
      this.designerId = id;
      console.log(this.designerId);

    activatingLinks();
  }
  

  ngOnInit(): void {
  }



  ngOnDestroy(): void {
    if((this.userSubscription)||(this.designerSubscription)){
      if(this.userSubscription){
        this.userSubscription.unsubscribe();
      }
      else if(this.designerSubscription){
        this.designerSubscription.unsubscribe();
      }
    }
  }
}
