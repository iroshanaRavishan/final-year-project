import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';


@Component({
  selector: 'app-edit-designer',
  templateUrl: './edit-designer.component.html',
  styleUrls: ['./edit-designer.component.css']
})
export class EditDesignerComponent implements OnInit {

  @Input() designer: any;
    
    id:any;
    data: any;

    designerId:any;

    error: string | any;
    submitted = false;
   
    userRegGroup!: FormGroup;
    designerRegGroup!: FormGroup;
    hShopRegGroup!: FormGroup;
  
    imageDataDesignerUserPro: string | any; 
    imageDataDesignerShopPro: string | any; 
  
    fileTypeDesignerUserPro: String | any;
    fileTypeDesignerShopPro: String | any;
  
    designerLogEmail: string | any;
    designerLogPassword: string | any;
  
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.designerId = this.designer._id;
    console.log(this.designerId);
    this.createDesignerRegForm();
  }

  createDesignerRegForm(){
      this.designerRegGroup = new FormGroup({
        designerRegUsername: new FormControl(this.designer.designerRegUsername),
        designerRegEmail: new FormControl(this.designer.designerRegEmail),
        designerRegNIC: new FormControl(this.designer.designerRegNIC),
        designerRegTelephone: new FormControl (this.designer.designerRegTelephone),
        designerRegAddress: new FormControl (this.designer.designerRegAddress),
        designerRegDistrict: new FormControl (this.designer.designerRegDistrict),
        designerRegShopName: new FormControl (this.designer.designerRegShopName),
        designerRegShopDesc: new FormControl(this.designer.designerRegShopDesc),
        designerRegShopEmail: new FormControl(this.designer.designerRegShopEmail),
        designerRegShopAddress: new FormControl (this.designer.designerRegShopAddress),
        designerRegShopDistrict: new FormControl (this.designer.designerRegShopDistrict),
        designerRegShopPostalCode: new FormControl (this.designer.designerRegShopPostalCode),
        designerRegShopLocation: new FormControl(this.designer.designerRegShopLocation),
        designerRegShopTelephone: new FormControl (this.designer.designerRegShopTelephone),
        designerRegPricing: new FormControl (this.designer.designerRegPricing)
      });
  }
  
    // designerPasswordMatch(control: FormControl){
    //   const password = control.root.get('designerRegPassword');
    //   return password && control.value !== password.value ? {
    //     designerPasswordMatch: true
    //   } : null;
    // }
  
    get designerRegFormValidation(){
      return this.designerRegGroup.controls;
    }
  
    onFileSelectDesignerUserPro(event: Event) { //execute when fire on selecting the file form the input
      console.log("A file selected");
      const file = (event.target as HTMLInputElement | any).files[0]; // take the first file of the selected array
      this.designerRegGroup.patchValue({ designerRegProfilePic: file });
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"]; // allowing the needed file types
  
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader(); // this reads the file asynchronusly and store the content
        reader.onload = () => {
          this.imageDataDesignerUserPro = reader.result as string;
          this.fileTypeDesignerUserPro = null;
        }
        reader.readAsDataURL(file);
      } 
      else { // if the file type is not applicable
        this.fileTypeDesignerUserPro = "File type is not acceptable";
        this.imageDataDesignerUserPro = null;
      }
      console.log(this.designerRegGroup.value.designerRegProfilePic);
    }
  
    onFileSelectDesignerShopPro(event: Event) { //execute when fire on selecting the file form the input
      console.log("A file selected");
      const file = (event.target as HTMLInputElement | any).files[0]; // take the first file of the selected array
      this.designerRegGroup.patchValue({ designerRegShopPic: file });
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"]; // allowing the needed file types
  
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader(); // this reads the file asynchronusly and store the content
        reader.onload = () => {
          this.imageDataDesignerShopPro = reader.result as string;
          this.fileTypeDesignerShopPro = null;
        }
        reader.readAsDataURL(file);
      } 
      else { // if the file type is not applicable
        this.fileTypeDesignerShopPro = "File type is not acceptable";
        this.imageDataDesignerShopPro = null;
      }
      console.log(this.designerRegGroup.value.designerRegShopPic);
    }

    updateDesigner(){
      this.submitted = true;
      if(this.designerRegGroup.invalid){
        return;
      }
  
      const designer = this.designerRegGroup.getRawValue();
      this.authService.updateDesigner(designer, this.designerId).subscribe(s => this.router.navigate(['auth/signupsuccess']));
     }
  
    get designerRegUsername() {
      return this.designerRegGroup.get('designerRegUsername');
    }
    get designerRegEmail() {
      return this.designerRegGroup.get('designerRegEmail');
    }
    get designerRegPassword() {
      return this.designerRegGroup.get('designerRegPassword');
    }
    get designerRegConfirmPassword() {
      return this.designerRegGroup.get('designerRegConfirmPassword');
    }
}
