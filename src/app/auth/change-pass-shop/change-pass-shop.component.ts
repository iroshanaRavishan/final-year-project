import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-change-pass-shop',
  templateUrl: './change-pass-shop.component.html',
  styleUrls: ['./change-pass-shop.component.css']
})
export class ChangePassShopComponent implements OnInit {

@Input() hShop: any;
 
hShopId:any;
submitted = false;
hShopPassUpdateGroup!: FormGroup;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.hShopId = this.hShop._id;
    console.log(this.hShop._id);
    this.createHShopUpdatePassForm();
  }

  createHShopUpdatePassForm(){
    this.hShopPassUpdateGroup = new FormGroup({
      hShopRegEmail: new FormControl(this.hShop.hShopRegEmail),
      hShopNewPassword: new FormControl (this.hShop.hShopRegNewPassword),
      hShopOldPassword: new FormControl (this.hShop.hShopRegOldPassword),
      hShopConfirmPassword: new FormControl (this.hShop.hShopRegConfirmPassword),
    });
  }

  get hShopFormValidation(){
    return this.hShopPassUpdateGroup.controls;
  }

  updatePassword() {
    this.submitted = true;
    if(this.hShopPassUpdateGroup.invalid){
      return;
    }

    const hShop = this.hShopPassUpdateGroup.getRawValue();
    this.authService.updatePasswordHShop(hShop, this.hShopId).subscribe(s => this.router.navigate(['auth/signupsuccess']));
  }

}
