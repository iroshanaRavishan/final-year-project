import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { Subscription } from 'rxjs';


declare const toggling: any;
declare const activatingLinks: any;

@Component({
  selector: 'app-designers-signup',
  templateUrl: './designers-signup.component.html',
  styleUrls: ['./designers-signup.component.css']
})
export class DesignersSignupComponent implements OnInit {

  designer: any;
  compPath: string ="dashboard";
  Designer: any;
  
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
  callActivating(compPath: string, designer:any){
    this.compPath = compPath;
    this.Designer = designer;
    activatingLinks();
  }
  
  receivePath($event: any) {
    this.compPath = $event;
  }

  ngOnInit(): void {
  }
}
