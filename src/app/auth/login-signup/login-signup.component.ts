import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/userRegistration';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  // userRegGroup: FormGroup | any;
  // form: FormGroup | any;
  // submitted = false;
  error: string | any;
  userLogUsername: string | any;
  userLogPassword: string | any;
  // designerLogEmail: string | any;
  // designerLogPassword: string | any;
  // shopLogEmail: string | any;
  // shopLogPassword:string | any;

  //common user group for users
  userRegGroup = new FormGroup({
    userRegUsername: new FormControl ('', [Validators.required]),
    userRegEmail: new FormControl('', [Validators.required, Validators.email]),
    userRegPassword: new FormControl ('', [Validators.required]),
    userRegConfirmPassword: new FormControl ('', [Validators.required, this.userpasswordMatch]),
    userRegTelephone: new FormControl ('', [Validators.required]),
    userRegAddress: new FormControl ('', [Validators.required]),
    userRegDistrict: new FormControl ('', [Validators.required])
  });

  /**
   * injecting servises
   * @param router 
   * @param authService 
   * @param formBuilder 
   */
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {  }




  // createUserRegForm(){
  //   this.userRegGroup = this.formBuilder.group({

  //     userRegFirstName: ['',Validators.required],
  //     userRegLastName: ['',Validators.required],
  //     userRegEmail:['',Validators.required, Validators.email],
  //     userRegPassword: ['',Validators.required],
  //     userRegConfirmPassword: ['',Validators.required, this.userpasswordMatch],
  //     userRegTelephone: ['', Validators.required],
  //     userRegAddress: ['',Validators.required],
  //     userRegDistrict: ['', Validators.required]
    
  //   });
  // }

  // createUserLogForm(){
  //   this.userLogGroup = this.formBuilder.group({
  //     userLogEmail: ['',Validators.required],
  //     userLogPassword: ['',Validators.required],
  //   });
  // }

  
  /**
   * function of matching passwords
   * @param control 
   * @returns 
   */
  userpasswordMatch(control: FormControl){
    const password = control.root.get('userRegPassword');
    return password && control.value !== password.value ? {
      userpasswordMatch: true
    } : null;
  }


  ngOnInit(): void {
   // this.createUserRegForm();
  }

  // get f(){
  //   return this.userRegGroup.controls;
  // }

  // insertData(){
  //   this.submitted = true;
  //   if(this.userRegGroup.invalid){
  //     return;
  //   }
  // }

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
    //  if(!this.userRegGroup.valid){
    //    return;
    //  }
    const user = this.userRegGroup.getRawValue();
    this.authService.userRegistration(user).subscribe(s => this.router.navigate(['aboutus']));
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

  userLogin(){
    this.error = '';
    this.authService.userLogin(this.userLogUsername, this.userLogPassword).subscribe(s => this.router.navigate(['aboutus']), e => (this.error = e));
  }

  // designerLogin(){
  //   this.authService.designerLogin(this.designerLogEmail, this.designerLogPassword).subscribe(s => this.router.navigate(['designers']));
  // }

  // shopLogin(){
  //   this.authService.shopLogin(this.shopLogEmail, this.shopLogPassword).subscribe(s => this.router.navigate(['shops']));
  // }


}
