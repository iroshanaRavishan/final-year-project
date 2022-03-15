import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';


@Component({
  selector: 'app-image-edit-designer',
  templateUrl: './image-edit-designer.component.html',
  styleUrls: ['./image-edit-designer.component.css']
})
export class ImageEditDesignerComponent implements OnInit {

  @Input() designer: any;

  designerId:any;
  submitted = false;

  designerRegGroup!: FormGroup;
  hShopRegGroup!: FormGroup;
 
  imageDataDesignerUserPro: string | any; 
  imageDataDesignerShopPro: string | any; 

  fileTypeDesignerUserPro: String | any;
  fileTypeDesignerShopPro: String | any;
 


  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.designerId = this.designer._id;
    this.updateDesignerProfilePicsForm();
  }

  updateDesignerProfilePicsForm(){
    this.designerRegGroup = new FormGroup({
      
      designerRegProfilePic: new FormControl(null),
      designerRegShopPic: new FormControl(null)
    });
  }

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
      this.fileTypeDesignerUserPro = "File type is not acceptable. Please select given type of image";
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
      this.fileTypeDesignerShopPro = "File type is not acceptable. Please select given type of image";
      this.imageDataDesignerShopPro = null;
    }
    console.log(this.designerRegGroup.value.designerRegShopPic);
  }

  updateDesignerProfilePics(){
    this.submitted = true;
    if(this.designerRegGroup.invalid){
      return;
    }

    let designerRegProfilePics : File[] = [];
    
    designerRegProfilePics.push(this.designerRegGroup.value.designerRegProfilePic);
    designerRegProfilePics.push(this.designerRegGroup.value.designerRegShopPic);

    // const designer = this.designerRegGroup.getRawValue();
    this.authService.updateDesignerProfilePics(designerRegProfilePics, this.designerId).subscribe(s => this.router.navigate(['auth/signupsuccess']));
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
