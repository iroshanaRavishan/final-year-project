import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { DesignerItems } from '@core/model/designerItemsRegistration';
import { Designer } from '@core/model/designerRegistration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inner-site',
  templateUrl: './inner-site.component.html',
  styleUrls: ['./inner-site.component.css']
})
export class InnerSiteComponent implements OnInit {

  designer: any;
  designerSubscription: Subscription | any;
  idOfSelectedDesigner: any;
  selectedEmail: any;
  loadedItems: File | any;
  relItems: DesignerItems[] = [];
  temp: any;

  categoryList: any[] = [];
  hashCategoryList: any[] = [];
  luxuryCatArr: any[] = [];
  hotelCatArr: any[] = [];
  commericalCatArr: any[] = [];
  shopCatArr: any[] = [];
  boxCatArr: any[] = [];
  oldCatArr: any[] = [];


  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idOfSelectedDesigner = this.activatedRoute.snapshot.paramMap.get("id");
    this.selectedEmail = this.activatedRoute.snapshot.paramMap.get("email");
    console.log(this.selectedEmail);

    this.authService.getDesigners();
    this.designerSubscription = this.authService.getDesignersStream().subscribe((designers: Designer[]) => {
      
      for (const designer of designers) {
        if(this.selectedEmail==designer.designerRegShopEmail){
          this.designer = designer;
        }
      }
    });
    this.loadingRelShopItemsDesigner();
  }

  onDestroy(): void {
    this.designerSubscription.unsubscribe();
     this.loadedItems.unsubscribe();
  }

  loadingRelShopItemsDesigner(){
    this.authService.loadingRelShopItemsDesigner(this.idOfSelectedDesigner, this.selectedEmail).subscribe(items => {
      this.loadedItems = items;
      for (let index = 0; index < this.loadedItems.length; index++) {
        if(this.idOfSelectedDesigner==this.loadedItems[index].designerSystemId){
          this.relItems.push(this.loadedItems[index]);
        }
      }

      for (let i = 0; i < this.relItems.length; i++) {
        if(this.categoryList.indexOf(this.relItems[i].category)===-1){
          this.categoryList.push(this.relItems[i].category);
        }
     
        if(this.relItems[i].category == 'Luxury Type') {
          this.luxuryCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Commercial') {
          this.commericalCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Hotels') {
          this.hotelCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Shop') {
          this.shopCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Box Type') {
          this.boxCatArr.push(this.relItems[i]);
        }
        if(this.relItems[i].category == 'Older Types') {
          this.oldCatArr.push(this.relItems[i]);
        }


      
        //if(this.newInnerCategoryList.indexOf([this.relItems[i].itemSubCategory, this.relItems[j].itemName])===-1){
          //this.newInnerCategoryList.push([this.relItems[i].itemSubCategory, this.relItems[j].itemName]);
      }

      for (let j = 0; j < this.categoryList.length; j++) {
        if(this.hashCategoryList.indexOf('#'+this.categoryList[j].replace(/\s/g, ''))===-1){

          this.hashCategoryList.push('#'+this.categoryList[j].replace(/\s/g, ''));
        }

        // if((this.relItems[i].category)==(this.categoryList[j])) {
        //   this.innerSubCatList.push([this.relItems[i].category, this.relItems[i].itemSubCategory]); 
        // }      
      }





      console.log(this.relItems);
    });
  };
}
