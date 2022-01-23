import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  userRegGroup: FormGroup | any;


  userLogEmail: string | any;
  userLogPassword: string | any;
  designerLogEmail: string | any;
  designerLogPassword: string | any;
  shopLogEmail: string | any;
  shopLogPassword:string | any;


  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  createUserRegForm(){
    this.userRegGroup = this.formBuilder.group({

      userRegFirstName: ['',Validators.required],
      userRegLastName: ['',Validators.required],
      userRegEmail:['',Validators.required, Validators.email],
      userRegPassword: ['',Validators.required],
      userRegConfirmPassword: ['',Validators.required],
      userRegTelephone: ['', Validators.required],
      userRegAddress: ['',Validators.required],
      userRegDistrict: ['', Validators.required]
    
    });
  }


  ngOnInit(): void {
    this.createUserRegForm();
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
    this.authService.userRegistration(user).subscribe(s => this.router.navigate(['contactus']));
  }

  userLogin(){
    this.authService.userLogin(this.userLogEmail, this.userLogPassword).subscribe(s => this.router.navigate(['']));
  }

  designerLogin(){
    this.authService.designerLogin(this.designerLogEmail, this.designerLogPassword).subscribe(s => this.router.navigate(['designers']));
  }

  shopLogin(){
    this.authService.shopLogin(this.shopLogEmail, this.shopLogPassword).subscribe(s => this.router.navigate(['shops']));
  }


}
