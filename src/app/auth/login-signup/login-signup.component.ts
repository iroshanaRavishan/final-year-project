import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';


@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  error: string | any;

  userLogEmail: string | any;
  userLogPassword: string | any;

  designerLogEmail: string | any;
  designerLogPassword: string | any;

  hShopLogEmail: string | any;
  hShopLogPassword:string | any;

  //common user group for users
  userRegGroup = new FormGroup({
    userRegUsername: new FormControl ('', [Validators.required]),
    userRegEmail: new FormControl('', [Validators.required, Validators.email]),
    userRegPassword: new FormControl ('', [Validators.required]),
    userRegConfirmPassword: new FormControl ('', [Validators.required, this.userPasswordMatch]),
    userRegProfilePic: new FormControl (''), 
    userRegTelephone: new FormControl ('', [Validators.required]),
    userRegAddress: new FormControl ('', [Validators.required]),
    userRegDistrict: new FormControl ('', [Validators.required])
  });

  //common designer group for designers
  designerRegGroup = new FormGroup({
    designerRegUsername: new FormControl ('', [Validators.required]),
    designerRegEmail: new FormControl('', [Validators.required, Validators.email]),
    designerRegNIC: new FormControl ('', [Validators.required]),
    designerRegPassword: new FormControl ('', [Validators.required]),
    designerRegConfirmPassword: new FormControl ('', [Validators.required, this.designerPasswordMatch]),
    designerRegProfilePic: new FormControl (''),
    designerRegTelephone: new FormControl ('', [Validators.required]),
    designerRegAddress: new FormControl ('', [Validators.required]),
    designerRegDistrict: new FormControl ('', [Validators.required]),
    designerRegShopName: new FormControl ('', [Validators.required]),
    designerRegShopDesc: new FormControl('', [Validators.required]),
    designerRegShopEmail: new FormControl('', [Validators.required, Validators.email]),
    designerRegShopAddress: new FormControl ('', [Validators.required]),
    designerRegShopDistrict: new FormControl ('', [Validators.required]),
    designerRegShopPostalCode: new FormControl ('', [Validators.required]),
    designerRegShopLocation: new FormControl('', [Validators.required]),
    designerRegShopTelephone: new FormControl ('', [Validators.required]),
    designerRegShopPic: new FormControl ('', [Validators.required]),
    designerRegPricing: new FormControl ('', [Validators.required])
  });

    //common shop group for hardware shops
  hShopRegGroup = new FormGroup({
    hShopRegUsername: new FormControl ('', [Validators.required]),
    hShopRegEmail: new FormControl('', [Validators.required, Validators.email]),
    hShopRegNIC: new FormControl ('', [Validators.required]),
    hShopRegPassword: new FormControl ('', [Validators.required]),
    hShopRegConfirmPassword: new FormControl ('', [Validators.required, this.hShopPasswordMatch]),
    hShopRegProfilePic: new FormControl (''),
    hShopRegTelephone: new FormControl ('', [Validators.required]),
    hShopRegAddress: new FormControl ('', [Validators.required]),
    hShopRegDistrict: new FormControl ('', [Validators.required]),
    hShopRegShopName: new FormControl ('', [Validators.required]),
    hShopRegShopDesc: new FormControl('', [Validators.required]),
    hShopRegShopEmail: new FormControl('', [Validators.required, Validators.email]),
    hShopRegShopAddress: new FormControl ('', [Validators.required]),
    hShopRegShopDistrict: new FormControl ('', [Validators.required]),
    hShopRegShopPostalCode: new FormControl ('', [Validators.required]),
    hShopRegShopLocation: new FormControl('', [Validators.required]),
    hShopRegShopTelephone: new FormControl ('', [Validators.required]),
    hShopRegShopPic: new FormControl ('', [Validators.required]),
    hShopRegPricing: new FormControl ('', [Validators.required])
  });

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {  }
  
  userPasswordMatch(control: FormControl){
    const password = control.root.get('userRegPassword');
    return password && control.value !== password.value ? {
      userPasswordMatch: true
    } : null;
  }

  designerPasswordMatch(control: FormControl){
    const password = control.root.get('designerRegPassword');
    return password && control.value !== password.value ? {
      designerPasswordMatch: true
    } : null;
  }

  hShopPasswordMatch(control: FormControl){
    const password = control.root.get('hShopRegPassword');
    return password && control.value !== password.value ? {
      hShopPasswordMatch: true
    } : null;
  }

  ngOnInit(): void {
    
  }

  idSignup:any = "userSU";
  tabChangesignup(id:any){
    console.log(id);
    this.idSignup = id;
  }

  idLogin:any = "userL";
  tabChangelogin(id:any){
    console.log(id);
    this.idLogin = id;
  }

  userRegistration(){
    const user = this.userRegGroup.getRawValue();
    this.authService.userRegistration(user).subscribe(s => this.router.navigate(['auth/signupsuccess']));
  }

  designerRegistration(){
    const designer = this.designerRegGroup.getRawValue();
    this.authService.designerRegistration(designer).subscribe(s => this.router.navigate(['auth/signupsuccess']));
  }

  hShopRegistration(){
    const hShop = this.hShopRegGroup.getRawValue();
    this.authService.hShopRegistration(hShop).subscribe(s => this.router.navigate(['auth/signupsuccess']));
  }


  get userRegUsername() {
    return this.userRegGroup.get('userRegUsername');
  }
  get userRegEmail() {
    return this.userRegGroup.get('userRegEmail');
  }
  get userRegPassword() {
    return this.userRegGroup.get('userRegPassword');
  }
  get userRegConfirmPassword() {
    return this.userRegGroup.get('userRegConfirmPassword');
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


  get hShopRegUsername() {
    return this.hShopRegGroup.get('hShopRegUsername');
  }
  get hShopRegEmail() {
    return this.hShopRegGroup.get('hShopRegEmail');
  }
  get hShopRegPassword() {
    return this.hShopRegGroup.get('hShopRegPassword');
  }
  get hShopRegConfirmPassword() {
    return this.hShopRegGroup.get('hShopRegConfirmPassword');
  }
  

  userLogin(){
    this.error = '';
    this.authService.userLogin(this.userLogEmail, this.userLogPassword).subscribe(s => this.router.navigate(['auth/signupsuccess']), e => (this.error = e));
  }

  designerLogin(){
    this.error = '';
    this.authService.designerLogin(this.designerLogEmail, this.designerLogPassword).subscribe(s => this.router.navigate(['auth/signupsuccess']), e => (this.error = e));
  }

  hShopLogin(){
    this.error = '';
    this.authService.hShopLogin(this.hShopLogEmail, this.hShopLogPassword).subscribe(s => this.router.navigate(['auth/signupsuccess']),  e => (this.error = e));
  }


}
