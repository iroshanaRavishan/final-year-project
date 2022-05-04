import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-add-product-shop',
  templateUrl: './add-product-shop.component.html',
  styleUrls: ['./add-product-shop.component.css']
})
export class AddProductShopComponent implements OnInit {

  @Input() hShop: any;

  br = true;
  hShopId: any;
  categories: any[] = [];
  clicked = false;
  selectedCategory: any;
  submitted = false;
  itemImageDataItem: string | any; 
  fileTypeItemImages: String | any;
  readOnlyToggle: string = 'true';
  newDisVal: string ='';

  itemImageDataItemT: string | any; 
  fileTypeItemImagesT: String | any;

  hShopProductTopForm!: FormGroup;
  hShopAddProductForm!: FormGroup;
  negativeVal: string | any = "";
  negativeValField:string | any = "";

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.hShopId = this.hShop._id;
    console.log(this.hShopId);  
    this.categories = ['Building', 'Paints', 'Electrical', 'Plumbing', 'Steel', 'Roofing', 'Tools', 'Garden & Decor', 'Ceiling', 'Fence'];  
    this.addItemHShopForm();
    this.addProductForm();

    if(this.hShopAddProductForm.value.designNoOfBathRooms > 0){
      this.br = true;
    }
  }

  addItemHShopForm() {
    this.hShopProductTopForm = new FormGroup({
      category: new FormControl(null),
    });
  }

  addProductForm() {
    this.hShopAddProductForm = new FormGroup({
        hShopSystemId: new FormControl (this.hShop._id),
        hShopEmail: new FormControl(this.hShop.hShopRegEmail),
        hShopShopName: new FormControl (this.hShop.hShopRegShopName),
        hShopShopEmail: new FormControl(this.hShop.hShopRegShopEmail),
        name: new FormControl ('', [Validators.required]),
        description: new FormControl ('', [Validators.required]),
        availability: new FormControl ('', [Validators.required]),
        subCategory: new FormControl('', [Validators.required]),
        portionType: new FormControl ('', [Validators.required]),        
        price: new FormControl ('', [Validators.required]),
        isDiscount: new FormControl('', [Validators.required]),
        discount: new FormControl('0', [Validators.required]),
        isQCPass: new FormControl ('', [Validators.required]),
        imagesOfItem: new FormControl(null),
        images: new FormControl(null),
        //imagesT: new FormControl(null),
    });
  }

  addNewCategory() {
    this.categories.push( this.hShopProductTopForm.value.category);
    this.hShopProductTopForm.reset();
  }

  valueOfDropdown(selectedCategory: any) {
    this.hShopProductTopForm.value.category = selectedCategory;
    console.log(selectedCategory);
    this.selectedCategory = selectedCategory;
  }

  addAnItem() {
    if(this.hShopProductTopForm.value.category){
      this.clicked = true;
    }   
  }

  discountToggle(event: any) {
    this.readOnlyToggle = event;
    console.log(this.readOnlyToggle);
    if(event=='false') {
     alert('The Discount will no be added if you click on **No** option!');
    }
  }

  get hShopAddingItemFormValidation(){
    return this.hShopAddProductForm.controls;
  }

  onFileSelectItemImages(event: Event) { //execute when fire on selecting the file form the input
    console.log("A file selected");
    const file = (event.target as HTMLInputElement | any).files[0]; // take the first file of the selected array
    this.hShopAddProductForm.patchValue({ images: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"]; // allowing the needed file types

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader(); // this reads the file asynchronusly and store the content
      reader.onload = () => {
        this.itemImageDataItem = reader.result as string;
        this.fileTypeItemImages = null;
      }
      reader.readAsDataURL(file);
    } 
    else { // if the file type is not applicable
      this.fileTypeItemImages = "File type is not acceptable";
      this.itemImageDataItem = null;
    }
    console.log(this.hShopAddProductForm.value.images);
  }

  submitProduct() {
    this.submitted = true;
    if(this.hShopAddProductForm.invalid){
      return;
    }
    
    if((this.hShopAddProductForm.value.price < 0) || (this.hShopAddProductForm.value.discount < 0) || (this.hShopAddProductForm.value.discount > 100)) { // || (this.hShopAddProductForm.value.designEstCost < 0) || (this.hShopAddProductForm.value.designNoOfBathRooms < 0)) 
      if((this.hShopAddProductForm.value.price < 0)){
        this.negativeValField = "price"

      }
      if( (this.hShopAddProductForm.value.discount < 0)){
        this.negativeValField = "Discount"
      }
      if( (this.hShopAddProductForm.value.discount > 100)){
        this.negativeValField = "Discount"
      } 
      // if( (this.hShopAddProductForm.value.portionPrice < 0)){
      //   this.negativeValField = "portion price"

      // }
    //   if( (this.hShopAddProductForm.value.estCost < 0)){
    //     this.negativeValField = "Estimsted Cost"

    //   }
    //   if( (this.hShopAddProductForm.value.noOfBathRooms < 0)){
    //     this.negativeValField = "No of Bath-rooms"

    //   }
      
    //   //this.hShopAddProductForm.invalid;
      this.negativeVal="Negative Values Are Not Acceptable!";
      return;
     }

    let itemImagesOfDesign : File[] = [];
    itemImagesOfDesign.push(this.hShopAddProductForm.value.images);    
    //itemImagesOfDesign.push(this.hShopAddProductForm.value.imagesT);
    if(this.readOnlyToggle=='false') {
      this.newDisVal = '0'
    } 
    if(this.readOnlyToggle=='true') {
      this.newDisVal = this.hShopAddProductForm.value.discount;
    }
    const priceWithUnit: string = `1 ${this.hShopAddProductForm.value.portionType}`+` - LKR. ${this.hShopAddProductForm.value.price}/=`;
    const item: File = this.hShopAddProductForm.getRawValue();
    this.authService.addProductItems(item, this.newDisVal, itemImagesOfDesign, this.selectedCategory, priceWithUnit).subscribe(s => this.router.navigate(['auth/signupsuccess']));
  }

}
