import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { HShopItems } from '@core/model/hShopItemsRegistration';

@Component({
  selector: 'app-all-items-shop',
  templateUrl: './all-items-shop.component.html',
  styleUrls: ['./all-items-shop.component.css']
})
export class AllItemsShopComponent implements OnInit {

  @Input() hShop: any;

  compPath: string = '';
  Item: any;
  itemsId: any;
  idOfSelectedHShop: any;
  selectedEmail: any;
  loadedItems: File | any;
  relItems: HShopItems[] = [];
 
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.idOfSelectedHShop = this.hShop._id;
    this.selectedEmail = this.hShop.hShopRegShopEmail;
    this.loadingRelShopItemsHShop();
  }

  loadingRelShopItemsHShop(){
    this.authService.loadingRelShopItemsHShop(this.idOfSelectedHShop, this.selectedEmail).subscribe(items => {
      this.loadedItems = items;
      for (let index = 0; index < this.loadedItems.length; index++) {
        if(this.idOfSelectedHShop==this.loadedItems[index].hShopSystemId){
          this.relItems.push(this.loadedItems[index]);
        }
      }
      console.log(this.relItems);
    });
  }

  updatehShopItem(compPath: string, item: any) {
    this.compPath = compPath;
    this.Item = item;
    this.itemsId = item._id;
    this.router.navigate([`auth/shopsignup/edititem/`+`${this.idOfSelectedHShop}`+`/${this.itemsId}`]);
  }
}
