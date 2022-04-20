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
  submittedU = false;
  submittedS = false;
  designerImageUpdateUserGroup!: FormGroup
  designerImageUpdateShopGroup!: FormGroup;
 
  imageDataDesignerUserPro: string | any; 
  imageDataDesignerShopPro: string | any; 

  fileTypeDesignerUserPro: String | any;
  fileTypeDesignerShopPro: String | any;
 
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.designerId = this.designer._id;
    this.updateDesignerUserProfilePicForm();
    this.updateDesignerShopProfilePicForm();
  }
  

  updateDesignerUserProfilePicForm(){
    this.designerImageUpdateUserGroup = new FormGroup({
      designerUserProfilePics: new FormControl(null),
      designerUserProfilePic: new FormControl(null)
    });
  }

  updateDesignerShopProfilePicForm(){
    this.designerImageUpdateShopGroup = new FormGroup({
      designerShopProfilePics: new FormControl(null),
      designerShopProfilePic: new FormControl(null)
    });
  }

  get designerUserProfilePicUpdateFormValidation(){
    return this.designerImageUpdateUserGroup.controls;
  }

  get designerShopProfilePicUpdateFormValidation(){
    return this.designerImageUpdateShopGroup.controls;
  }

  onFileSelectDesignerUserPro(event: Event) { //execute when fire on selecting the file form the input
    console.log("A file selected");
    const file = (event.target as HTMLInputElement | any).files[0]; // take the first file of the selected array
    this.designerImageUpdateUserGroup.patchValue({ designerUserProfilePics: file });
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
    console.log(this.designerImageUpdateUserGroup.value.designerUserProfilePics);
  }

  onFileSelectDesignerShopPro(event: Event) { //execute when fire on selecting the file form the input
    console.log("A file selected");
    const file = (event.target as HTMLInputElement | any).files[0]; // take the first file of the selected array
    this.designerImageUpdateShopGroup.patchValue({ designerShopProfilePics: file });
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
    console.log(this.designerImageUpdateShopGroup.value.designerShopProfilePics);
  }

  updateDesignerUserProfilePic(){
    this.submittedU = true;
    if(this.designerImageUpdateUserGroup.invalid){
      return;
    }

    let designerRegProfilePics : File[] = [];
    designerRegProfilePics.push(this.designerImageUpdateUserGroup.value.designerUserProfilePics);

    // const designer = this.designerRegGroup.getRawValue();
    this.authService.updateDesignerUserProfilePic(designerRegProfilePics, this.designerId).subscribe(s => this.router.navigate(['auth/signupsuccess']));
  }

  updateDesignerShopProfilePic(){
    this.submittedS = true;
    if(this.designerImageUpdateShopGroup.invalid){
      return;
    }

    let designerRegProfilePics : File[] = [];
    designerRegProfilePics.push(this.designerImageUpdateShopGroup.value.designerShopProfilePics);

    // const designer = this.designerRegGroup.getRawValue();
    this.authService.updateDesignerShopProfilePic(designerRegProfilePics, this.designerId).subscribe(s => this.router.navigate(['auth/signupsuccess']));
  }
}
