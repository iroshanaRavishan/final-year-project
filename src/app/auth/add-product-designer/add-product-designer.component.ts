import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service'

@Component({
  selector: 'app-add-product-designer',
  templateUrl: './add-product-designer.component.html',
  styleUrls: ['./add-product-designer.component.css']
})
export class AddProductDesignerComponent implements OnInit {

  @Input() designer: any;

  br = true;
  designerId: any;
  categories: any[] = [];
  clicked = false;
  selectedCategory: any;
  submitted = false;
  designImageDataDesign: string | any; 
  fileTypeDesignImages: String | any;

  designImageDataDesignT: string | any; 
  fileTypeDesignImagesT: String | any;

  designerProductTopForm!: FormGroup;
  designerAddProductForm!: FormGroup;
  negativeVal: string | any = "";
  negativeValField:string | any = "";

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.designerId = this.designer._id;
    console.log(this.designerId);  
    this.categories = ['Story Houses', 'Old Type', 'New Type', 'Box Type'];
    this.addItemDesignerForm();
    this.addProductForm();

    if(this.designerAddProductForm.value.designNoOfBathRooms > 0){
      this.br = true;
    }
  }

  addItemDesignerForm() {
    this.designerProductTopForm = new FormGroup({
      category: new FormControl(null),    
    });
  }

  addProductForm() {
    this.designerAddProductForm = new FormGroup({
      designerSystemId: new FormControl (this.designer._id),
      designerEmail: new FormControl(this.designer.designerRegEmail),
      designerShopName: new FormControl (this.designer.designerRegShopName),
      designerShopEmail: new FormControl(this.designer.designerRegShopEmail),
      designName: new FormControl ('', [Validators.required]),
      designDescription: new FormControl ('', [Validators.required]),
      designArea: new FormControl ('', [Validators.required]),
      designNoOfFloors: new FormControl ('', [Validators.required]),
      designEstCost: new FormControl ('', [Validators.required]),
      designIsGarage: new FormControl ('', [Validators.required]),
      designIsBalcony: new FormControl ('', [Validators.required]),
      designIsVarenda: new FormControl ('', [Validators.required]),
      designNoOfBathRooms: new FormControl ('', [Validators.required]),
      designIsBathRoomAttached: new FormControl (''),
      designImagesOfDesign: new FormControl(null),
      designImages: new FormControl(null),
      //designImagesT: new FormControl(null),
    });
  }

  addNewCategory() {
    this.categories.push( this.designerProductTopForm.value.category);
    this.designerProductTopForm.reset();
  }

  valueOfDropdown(selectedCategory: any) {
    this.designerProductTopForm.value.category = selectedCategory;
    console.log(selectedCategory);
    this.selectedCategory = selectedCategory;
  }

  addAnItem() {
    if(this.designerProductTopForm.value.category){
      this.clicked = true;
    }   
  }

  get designerRegFormValidation(){
    return this.designerAddProductForm.controls;
  }

  onFileSelectDesignImages(event: Event) { //execute when fire on selecting the file form the input
    console.log("A file selected");
    const file = (event.target as HTMLInputElement | any).files[0]; // take the first file of the selected array
    this.designerAddProductForm.patchValue({ designImages: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"]; // allowing the needed file types

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader(); // this reads the file asynchronusly and store the content
      reader.onload = () => {
        this.designImageDataDesign = reader.result as string;
        this.fileTypeDesignImages = null;
      }
      reader.readAsDataURL(file);
    } 
    else { // if the file type is not applicable
      this.fileTypeDesignImages = "File type is not acceptable";
      this.designImageDataDesign = null;
    }
    console.log(this.designerAddProductForm.value.designImages);
  }

  // onFileSelectDesignImagesT(event: Event) { //execute when fire on selecting the file form the input
  //   console.log("A file selected");
  //   const file = (event.target as HTMLInputElement | any).files[0]; // take the first file of the selected array
  //   this.designerAddProductForm.patchValue({ designImagesT: file });
  //   const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"]; // allowing the needed file types

  //   if (file && allowedMimeTypes.includes(file.type)) {
  //     const reader = new FileReader(); // this reads the file asynchronusly and store the content
  //     reader.onload = () => {
  //       this.designImageDataDesignT = reader.result as string;
  //       this.fileTypeDesignImagesT = null;
  //     }
  //     reader.readAsDataURL(file);
  //   } 
  //   else { // if the file type is not applicable
  //     this.fileTypeDesignImages = "File type is not acceptable";
  //     this.designImageDataDesign = null;
  //   }
  //   console.log(this.designerAddProductForm.value.designImages);
  // }

  submitProduct() {
    this.submitted = true;
    if(this.designerAddProductForm.invalid){
      return;
    }
    
    if((this.designerAddProductForm.value.designArea < 0) || (this.designerAddProductForm.value.designNoOfFloors < 0) || (this.designerAddProductForm.value.designEstCost < 0) || (this.designerAddProductForm.value.designNoOfBathRooms < 0)) {
      if((this.designerAddProductForm.value.designArea < 0)){
        this.negativeValField = "Area of the plan"
      }
      if( (this.designerAddProductForm.value.designNoOfFloors < 0)){
        this.negativeValField = "No of floors"
      }
      if( (this.designerAddProductForm.value.designEstCost < 0)){
        this.negativeValField = "Estimsted Cost"
      }
      if( (this.designerAddProductForm.value.designNoOfBathRooms < 0)){
        this.negativeValField = "No of Bath-rooms"
      }
      
      //this.designerAddProductForm.invalid;
      this.negativeVal="Negative Values Are Not Acceptable!";
      return;
    }

    let designImagesOfDesign : File[] = [];
    designImagesOfDesign.push(this.designerAddProductForm.value.designImages);    
    //designImagesOfDesign.push(this.designerAddProductForm.value.designImagesT);      

    const item: File = this.designerAddProductForm.getRawValue();
    this.authService.addDesignItems(item, designImagesOfDesign, this.selectedCategory).subscribe(s => this.router.navigate(['auth/signupsuccess']));
  }

  
}


