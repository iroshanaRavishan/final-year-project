import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { HShop } from '@core/model/hShopRegistration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  hShops: HShop[] = [];
  hShopSubscription: Subscription | any;
  email: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getHShops();
    this.hShopSubscription = this.authService.getHShopsStream().subscribe((hShops: HShop[]) => {
        this.hShops = hShops;
      });
  }

  ngOnDestroy() {
    this.hShopSubscription.unsubscribe();
  }

  goInnerPage(hShop: any) {
    this.email = hShop.hShopRegShopEmail;
    this.router.navigate([`shops/`+`${hShop._id}`+`/${this.email}`]);
  }

}
