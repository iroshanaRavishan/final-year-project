import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { AllSells } from '@core/model/allSells';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-sells',
  templateUrl: './all-sells.component.html',
  styleUrls: ['./all-sells.component.css']
})
export class AllSellsComponent implements OnInit {

  @Input() hShop: any;

  compPath: string = '';
  Order: any;
  sellsId: any;
  hShopId: any;
  count: number = 0;
  earnings: number = 0;
  as: any[] = [];
  hs: any[]=[];

  allSells: AllSells[] = [];
  allSellsSubscription: Subscription | any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.hShopId = this.hShop._id;
    console.log(this.hShopId);

    this.authService.getAllSells();
    this.allSellsSubscription = this.authService.getAllSellsStream().subscribe((allSells: AllSells[]) => {

      for (const allSell of allSells) {
        if(this.hShopId==allSell.shopId){
          this.allSells.push(allSell);
        } 
      }
      for (let index = 0; index < this.allSells.length; index++) {
        this.count = 1 + index;
        this.earnings = this.earnings + parseInt( this.allSells[index].total, 10);
      }
    });
  }

  ngOnDestroy() {
    this.allSellsSubscription.unsubscribe();
  }

  updateStstus(compPath: string, sell: any) {
    this.compPath = compPath;
    this.Order = sell;
   this.sellsId = sell._id;
    this.router.navigate([`auth/shopsignup/editsells/`+`${this.sellsId}`]);
  }
}
