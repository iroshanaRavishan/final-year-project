import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { HShop } from '@core/model/hShopRegistration';
import { ProductDataService } from '@core/products/product-data.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  hShops: HShop[] = [];
  hShopSubscription: Subscription | any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getHShops();
    this.hShopSubscription = this.authService.getHShopsStream().subscribe((hShops: HShop[]) => {
        this.hShops = hShops;
      });
  }

  ngOnDestroy() {
    this.hShopSubscription.unsubscribe();
  }

}
