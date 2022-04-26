import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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


  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //this.categoryList = ['Building', 'Paints']; //'Sand', 'metle', 'Home Accesories', 'Garden Accesories' , 'Electrical', 'Plumbing', 'Steel', 'Roofing', 'Tools', 'Garden & Decor'
    this.idOfSelectedHShop = this.activatedRoute.snapshot.paramMap.get("id");
    this.selectedEmail = this.activatedRoute.snapshot.paramMap.get("email");
    // console.log(this.selectedEmail);

    this.authService.getHShops();
    this.hShopSubscription = this.authService.getHShopsStream().subscribe((hShops: HShop[]) => {
      
      for (const hShop of hShops) {
        if(this.selectedEmail==hShop.hShopRegShopEmail){
          this.hShop = hShop;
        } 
      }
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
        if(this.categoryList.indexOf(this.relItems[i].itemCategory)===-1){
          this.categoryList.push(this.relItems[i].itemCategory);
        }

        if(this.relItems[i].itemCategory == 'Building') {
          this.buildingCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].itemCategory == 'Paints') {
          this.paintsCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].itemCategory == 'Electrical') {
          this.electricalCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].itemCategory == 'Plumbing') {
          this.plumbingCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].itemCategory == 'Steel') {
          this.steelCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].itemCategory == 'Roofing') {
          this.roofingCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].itemCategory == 'Tools') {
          this.toolsCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].itemCategory == 'Garden & Decor') {
          this.gardenCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].itemCategory == 'Ceiling') {
          this.ceilingCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].itemCategory == 'Fence') {
          this.fenceCatArr.push(this.relItems[i]);
        }

        for (let j = 0; j < this.categoryList.length; j++) {
          if(this.hashCategoryList.indexOf('#'+this.categoryList[j])===-1){
            this.hashCategoryList.push('#'+this.categoryList[j]);
          }

          if((this.relItems[i].itemCategory)==(this.categoryList[j])) {
            this.innerSubCatList.push([this.relItems[i].itemCategory, this.relItems[i].itemSubCategory]); 
          }      
        }
        //if(this.newInnerCategoryList.indexOf([this.relItems[i].itemSubCategory, this.relItems[j].itemName])===-1){
          //this.newInnerCategoryList.push([this.relItems[i].itemSubCategory, this.relItems[j].itemName]);
      }

      // for (let j = 0; j < this.categoryList.length; j++) {
      //   this.hashCategoryList.push('#'+this.categoryList[i]); 
      // }

      // console.log(this.buildingCatArr);   
      // console.log(this.paintsCatArr); 

      // console.log(this.relItems);
      // console.log(this.innerSubCatList);
      console.log(this.categoryList);
      // console.log(this.toolsCatArr);
      console.log(this.hashCategoryList);
      
    });
   
  };

}
