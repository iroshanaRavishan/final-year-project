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
    this.categories = ['one', 'two', 'three', 'four'];
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
        itemName: new FormControl ('', [Validators.required]),
        itemDescription: new FormControl ('', [Validators.required]),
        itemPrice: new FormControl ('', [Validators.required]),
        itemIsQCPass: new FormControl ('', [Validators.required]),
        itemImagesOfItem: new FormControl(null),
        itemImages: new FormControl(null),
        //itemImagesT: new FormControl(null),
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

  get hShopAddingItemFormValidation(){
    return this.hShopAddProductForm.controls;
  }

  onFileSelectItemImages(event: Event) { //execute when fire on selecting the file form the input
    console.log("A file selected");
    const file = (event.target as HTMLInputElement | any).files[0]; // take the first file of the selected array
    this.hShopAddProductForm.patchValue({ itemImages: file });
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
    console.log(this.hShopAddProductForm.value.itemImages);
  }

  submitProduct() {
    this.submitted = true;
    if(this.hShopAddProductForm.invalid){
      return;
    }
    
    if((this.hShopAddProductForm.value.itemPrice < 0)) {  //|| (this.hShopAddProductForm.value.designNoOfFloors < 0) || (this.hShopAddProductForm.value.designEstCost < 0) || (this.hShopAddProductForm.value.designNoOfBathRooms < 0)) 
      if((this.hShopAddProductForm.value.itemPrice < 0)){
        this.negativeValField = "price"

      }
    //   if( (this.hShopAddProductForm.value.designNoOfFloors < 0)){
    //     this.negativeValField = "No of floors"

    //   }
    //   if( (this.hShopAddProductForm.value.designEstCost < 0)){
    //     this.negativeValField = "Estimsted Cost"

    //   }
    //   if( (this.hShopAddProductForm.value.designNoOfBathRooms < 0)){
    //     this.negativeValField = "No of Bath-rooms"

    //   }
      
    //   //this.hShopAddProductForm.invalid;
      this.negativeVal="Negative Values Are Not Acceptable!";
      return;
     }

    let itemImagesOfDesign : File[] = [];
    itemImagesOfDesign.push(this.hShopAddProductForm.value.itemImages);    
    //itemImagesOfDesign.push(this.hShopAddProductForm.value.itemImagesT);      
    
    const item: File = this.hShopAddProductForm.getRawValue();
    this.authService.addProductItems(item, itemImagesOfDesign, this.selectedCategory).subscribe(s => this.router.navigate(['auth/signupsuccess']));
  }

}
