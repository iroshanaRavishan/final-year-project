import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { Subscription } from 'rxjs';

declare const toggling: any;
declare const activatingLinks: any;

@Component({
  selector: 'app-shops-signup',
  templateUrl: './shops-signup.component.html',
  styleUrls: ['./shops-signup.component.css']
})
export class ShopsSignupComponent implements OnInit {

  hShop: any;
  compPath: string ="dashboard";
  HShop: any;
  hShopSubscription: Subscription | any;

  constructor(private authService: AuthService) { 
    this.authService.findMe().subscribe(hShop => (this.hShop = hShop));
    this.hShopSubscription = this.authService.hShop.subscribe(hSHop => (this.hShop = hSHop));
  }

  callToggling() {
    toggling();
  }

  callActivating(compPath: string, hShop: any) {
    this.compPath = compPath;
    this.HShop = hShop;
    activatingLinks();
  }

  receivePath($event: any) {
    this.compPath = $event;
  }

  ngOnInit(): void {
  }
}
