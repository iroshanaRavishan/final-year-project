import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { Designer } from '@core/model/designerRegistration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-designers-signup',
  templateUrl: './designers-signup.component.html',
  styleUrls: ['./designers-signup.component.css']
})
export class DesignersSignupComponent implements OnInit {

  designer: Designer | any;
  
  userSubscription: Subscription | any;
  designerSubscription: Subscription | any;
  hShopSubscription: Subscription | any;

  public searchTerm: string = "";

  constructor(private authService: AuthService) { 
    // this.authService.findMe().subscribe(designer => (this.designer = designer));
    // this.designerSubscription = this.authService.designer.subscribe(designer => (this.designer = designer));

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
