import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { HShopItems } from '@core/model/hShopItemsRegistration';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-order-preview',
  templateUrl: './order-preview.component.html',
  styleUrls: ['./order-preview.component.css']
})
export class OrderPreviewComponent implements OnInit {

  idOfShop: any;
  idOfItem: any;
  typeOfVender: any;
  hShopsItem: any[] = [];
  relItem: any;
  type: any;
  quentity: any;
  finalPrice: number=0;
  total: number = 0;
  trueValue: any;
  shippingFee: number=0;
  q: number = 0;
  fp: number = 0;
  sf: number = 0;


  hShopItemSubscription: Subscription | any;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idOfShop = this.activatedRoute.snapshot.paramMap.get("sid");
    this.idOfItem = this.activatedRoute.snapshot.paramMap.get("id");
    this.typeOfVender = this.activatedRoute.snapshot.paramMap.get("type");

    this.authService.getHShopsItems();
    this.hShopItemSubscription = this.authService.getHShopsItemsStream().subscribe((hShopsItems: HShopItems[]) => {
      
      for (const hShopsItem of hShopsItems) {
          this.hShopsItem.push(hShopsItem);
      }
      for (let index = 0; index < this.hShopsItem.length; index++) {
        if(this.idOfItem==this.hShopsItem[index]._id){
          this.relItem=(this.hShopsItem[index]);
          console.log(this.relItem);
        } 
      }
      this.finalPrice = this.relItem.price;
    });
  }

  confirm() {
    if (this.quentity <= 0) {
      alert('No More Items Available to Buy')
    }

    if (!((this.quentity)%1==0)) {
      alert('You entered a decimal values. The number of items is being changed by the system.');
      this.trueValue = Math.round(this.quentity);
    }
    else {
      this.trueValue = this.quentity;
    } 

    this.finalPrice = this.relItem.price * this.trueValue;
    if ((this.quentity > 10) && (this.finalPrice) > 500) {
      this.shippingFee = (this.finalPrice * 9.5 / 100);
      this.total = (this.finalPrice + this.shippingFee);
    }
    else if ((this.quentity < 10) || (this.finalPrice) <= 500) {
      this.shippingFee = (this.finalPrice * 0 / 100);
      this.total = 0;
    }
  }
  checkout() {
    this.router.navigate([`shared/`+`${this.idOfShop}`+`/${this.typeOfVender}`+`/${this.idOfItem}`+`/confirmed`+`/${this.quentity}`+`/${this.finalPrice}`+`/${this.shippingFee}`]);
  }
}
