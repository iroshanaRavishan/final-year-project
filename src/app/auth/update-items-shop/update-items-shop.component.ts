import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { HShopItems } from '@core/model/hShopItemsRegistration';

@Component({
  selector: 'app-update-items-shop',
  templateUrl: './update-items-shop.component.html',
  styleUrls: ['./update-items-shop.component.css']
})
export class UpdateItemsShopComponent implements OnInit {

  itemId: any;
  idOfSelectedHShop: any;
  selectedEmail: any;
  loadedItems: File | any;
  relItems: HShopItems[] = [];
  relavantItem: any;
  itemIdtoDelete: any;
  submitted = false;
  readOnlyToggle: string = 'true';
  newDisVal: string ='';

  hShopUpdateProductForm!: FormGroup;
  negativeVal: string | any = "";
  negativeValField:string | any = "";

 
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.itemId = this.activatedRoute.snapshot.paramMap.get("id");
    this.idOfSelectedHShop = this.activatedRoute.snapshot.paramMap.get("sid");

    this.authService.loadingRelShopItemsHShop(this.idOfSelectedHShop, this.selectedEmail).subscribe(items => {
      this.loadedItems = items;
      for (let index = 0; index < this.loadedItems.length; index++) {
        if(this.idOfSelectedHShop==this.loadedItems[index].hShopSystemId){

          if(this.itemId==this.loadedItems[index]._id){
            this.relItems.push(this.loadedItems[index]);
            this.relavantItem = this.loadedItems[index];
            // this is exact place to chec the ._id 
          }        
        }
      }
    }); 
    this.addProductForm();
  }

  addProductForm() {
    this.hShopUpdateProductForm = new FormGroup({
        name: new FormControl ('', [Validators.required]),
        description: new FormControl ('', [Validators.required]),
        availability: new FormControl ('', [Validators.required]),      
        price: new FormControl ('', [Validators.required]),
        isDiscount: new FormControl('', [Validators.required]),
        discount: new FormControl('0', [Validators.required])
    });
  }

  discountToggle(event: any) {
    this.readOnlyToggle = event;
    if(event=='false') {
     alert('The Discount will no be added if you click on **No** option!');
    }
  }

  get hShopUpdatingItemFormValidation(){
    return this.hShopUpdateProductForm.controls;
  }

  backNavigation() {
    this.router.navigate(['auth/shopssignup']);
  }

  deleteItem(item: any) {
    this.itemIdtoDelete = item._id;
    console.log(this.itemIdtoDelete);
    this.authService.deleteAnItemHshop(this.itemIdtoDelete).subscribe(s => this.router.navigate(['auth/shopssignup']));
  }

  updateProduct() {
    this.submitted = true;
    if(this.hShopUpdateProductForm.invalid){
      return;
    }
    
    if((this.hShopUpdateProductForm.value.price < 0) || (this.hShopUpdateProductForm.value.discount < 0) || (this.hShopUpdateProductForm.value.discount > 100)) { 
      if((this.hShopUpdateProductForm.value.price < 0)){
        this.negativeValField = "price"
      }
      if( (this.hShopUpdateProductForm.value.discount < 0)){
        this.negativeValField = "Discount"
      }
      if( (this.hShopUpdateProductForm.value.discount > 100)){
        this.negativeValField = "Discount"
      } 
      this.negativeVal="Negative Values Are Not Acceptable!";
      return;
     }
    if(this.readOnlyToggle=='false') {
      this.newDisVal = '0'
    } 
    if(this.readOnlyToggle=='true') {
      this.newDisVal = this.hShopUpdateProductForm.value.discount;
    }
    const priceWithUnit: string = `1 ${this.hShopUpdateProductForm.value.portionType}`+` - LKR. ${this.hShopUpdateProductForm.value.price}/=`;
    const item: File = this.hShopUpdateProductForm.getRawValue();
    this.authService.updateHShopItems(item, this.newDisVal, priceWithUnit, this.itemId).subscribe(s => this.router.navigate(['auth/shopssignup']));
  }
}