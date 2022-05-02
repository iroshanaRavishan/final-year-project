import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { HShopItems } from '@core/model/hShopItemsRegistration';
import { HShop } from '@core/model/hShopRegistration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inner-site',
  templateUrl: './inner-site.component.html',
  styleUrls: ['./inner-site.component.css']
})
export class InnerSiteComponent implements OnInit {

  hShop: any;
  hShopSubscription: Subscription | any;
  idOfSelectedHShop: any;
  selectedEmail: any;
  loadedItems: File | any;
  type: any;
  relItems: HShopItems[] = [];
  categoryList: any[] = [];
  hashCategoryList: any[] = [];
  newInnerCategoryList: any[][] =[];
  innerSubCatList: any[][] = [];

  buildingCatArr: any[] = [];
  paintsCatArr: any[] = [];
  electricalCatArr: any[] = [];
  plumbingCatArr: any[] = [];
  steelCatArr: any[] = [];
  roofingCatArr: any[] = [];
  toolsCatArr: any[] = [];
  gardenCatArr: any[] = [];
  ceilingCatArr: any[] = [];
  fenceCatArr: any[] = [];

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //this.categoryList = ['Building', 'Paints']; //'Sand', 'metle', 'Home Accesories', 'Garden Accesories' , 'Electrical', 'Plumbing', 'Steel', 'Roofing', 'Tools', 'Garden & Decor'
    this.idOfSelectedHShop = this.activatedRoute.snapshot.paramMap.get("sid");
    this.selectedEmail = this.activatedRoute.snapshot.paramMap.get("email");

    this.authService.getHShops();
    this.hShopSubscription = this.authService.getHShopsStream().subscribe((hShops: HShop[]) => {
      
      for (const hShop of hShops) {
        if(this.selectedEmail==hShop.hShopRegShopEmail){
          this.hShop = hShop;
        } 
      }
      this.type = this.hShop.Roles[0];
      console.log(this.hShop);
      console.log(this.type);
    });
    this.loadingRelShopItemsHShop();
  }

  onDestroy(): void {
    this.hShopSubscription.unsubscribe();
     this.loadedItems.unsubscribe();
  }

  loadingRelShopItemsHShop(){
    this.authService.loadingRelShopItemsHShop(this.idOfSelectedHShop, this.selectedEmail).subscribe(items => {
      this.loadedItems = items;
      for (let index = 0; index < this.loadedItems.length; index++) {
        if(this.idOfSelectedHShop==this.loadedItems[index].hShopSystemId){
          this.relItems.push(this.loadedItems[index]);
        }
      }
      for (let i = 0; i < this.relItems.length; i++) {
        if(this.categoryList.indexOf(this.relItems[i].category)===-1){
          this.categoryList.push(this.relItems[i].category);
        }

        if(this.relItems[i].category == 'Building') {
          this.buildingCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Paints') {
          this.paintsCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Electrical') {
          this.electricalCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Plumbing') {
          this.plumbingCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Steel') {
          this.steelCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Roofing') {
          this.roofingCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Tools') {
          this.toolsCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Garden & Decor') {
          this.gardenCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Ceiling') {
          this.ceilingCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Fence') {
          this.fenceCatArr.push(this.relItems[i]);
        }

        for (let j = 0; j < this.categoryList.length; j++) {
          if(this.hashCategoryList.indexOf('#'+this.categoryList[j])===-1){
            this.hashCategoryList.push('#'+this.categoryList[j]);
          }

          if((this.relItems[i].category)==(this.categoryList[j])) {
            this.innerSubCatList.push([this.relItems[i].category, this.relItems[i].subCategory]); 
          }      
        }
      } 
    });
  }

  previewBefore(item: any) {
    this.router.navigate([`shared/`+`${this.idOfSelectedHShop}`+`/${this.type}`+`/${item._id}`]);
  }
}
