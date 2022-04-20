import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-image-edit-shop',
  templateUrl: './image-edit-shop.component.html',
  styleUrls: ['./image-edit-shop.component.css']
})
export class ImageEditShopComponent implements OnInit {

  @Input() hShop: any;
  
  hShopId:any;
  submittedU = false;
  submittedS = false;
  hShopImageUpdateUserGroup!: FormGroup;
  hShopImageUpdateShopGroup!: FormGroup;
 
  imageDataHShopUserPro: string | any; 
  imageDataHShopShopPro: string | any; 

  fileTypeHSHopUserPro: String | any;
  fileTypeHShopShopPro: String | any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.hShopId = this.hShop._id;
    this.updateHShopUserProfilePicForm();
    this.updateHShopShopProfilePicForm();
  }

  updateHShopUserProfilePicForm(){
    this.hShopImageUpdateUserGroup = new FormGroup({
      hShopUserProfilePics: new FormControl(null),
      hShopUserProfilePic: new FormControl(null)
    });
  }

  updateHShopShopProfilePicForm(){
    this.hShopImageUpdateShopGroup = new FormGroup({
      hShopShopProfilePics: new FormControl(null),
      hShopShopProfilePic: new FormControl(null)
    });
  }

  get hShopUserProfilePicUpdateFormValidation(){
    return this.hShopImageUpdateUserGroup.controls;
  }

  get hShopShopProfilePicUpdateFormValidation(){
    return this.hShopImageUpdateShopGroup.controls;
  }

  onFileSelectHShopUserPro(event: Event) { //execute when fire on selecting the file form the input
    console.log("A file selected");
    const file = (event.target as HTMLInputElement | any).files[0]; // take the first file of the selected array
    this.hShopImageUpdateUserGroup.patchValue({ hShopUserProfilePics: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"]; // allowing the needed file types

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader(); // this reads the file asynchronusly and store the content
      reader.onload = () => {
        this.imageDataHShopUserPro = reader.result as string;
        this.fileTypeHSHopUserPro = null;
      }
      reader.readAsDataURL(file);
    } 
    else { // if the file type is not applicable
      this.fileTypeHSHopUserPro = "File type is not acceptable. Please select given type of image";
      this.imageDataHShopUserPro = null;
    }
    console.log(this.hShopImageUpdateUserGroup.value.hShopUserProfilePics);
  }

  onFileSelectHShopShopPro(event: Event) { //execute when fire on selecting the file form the input
    console.log("A file selected");
    const file = (event.target as HTMLInputElement | any).files[0]; // take the first file of the selected array
    this.hShopImageUpdateShopGroup.patchValue({ hShopShopProfilePics: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"]; // allowing the needed file types

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader(); // this reads the file asynchronusly and store the content
      reader.onload = () => {
        this.imageDataHShopShopPro = reader.result as string;
        this.fileTypeHShopShopPro = null;
      }
      reader.readAsDataURL(file);
    } 
    else { // if the file type is not applicable
      this.fileTypeHShopShopPro = "File type is not acceptable. Please select given type of image";
      this.imageDataHShopShopPro = null;
    }
    console.log(this.hShopImageUpdateShopGroup.value.hShopShopProfilePics);
  }

  updateHShopUserProfilePic(){
    this.submittedU = true;
    if(this.hShopImageUpdateUserGroup.invalid){
      return;
    }
    let hShopUserProfilePic: File[] = [];
    hShopUserProfilePic.push(this.hShopImageUpdateUserGroup.value.hShopUserProfilePics);

    this.authService.updateHShopUserProfilePic(hShopUserProfilePic, this.hShopId).subscribe(s => this.router.navigate(['auth/signupsuccess']));
  }

  updateHShopShopProfilePic(){
    this.submittedS = true;
    if(this.hShopImageUpdateShopGroup.invalid){
      return;
    }
    let hShopShopProfilePic: File[] = [];
    hShopShopProfilePic.push(this.hShopImageUpdateShopGroup.value.hShopShopProfilePics);

    this.authService.updateHShopShopProfilePic(hShopShopProfilePic, this.hShopId).subscribe(s => this.router.navigate(['auth/signupsuccess']));
  }

}
