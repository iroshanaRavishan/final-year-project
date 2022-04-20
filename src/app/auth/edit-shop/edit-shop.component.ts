import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.css']
})
export class EditShopComponent implements OnInit {

  @Input() hShop: any;

  hShopId:any;
  submitted = false;
  hShopUpdateFormGroup!: FormGroup;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.hShopId = this.hShop._id;
    console.log(this.hShopId);
    this.createHShopUpdateForm();
  }

  createHShopUpdateForm(){
    this.hShopUpdateFormGroup = new FormGroup({
      hShopRegUsername: new FormControl(this.hShop.hShopRegUsername),
      hShopRegEmail: new FormControl(this.hShop.hShopRegEmail),
      hShopRegNIC: new FormControl(this.hShop.hShopRegNIC),
      hShopRegTelephone: new FormControl (this.hShop.hShopRegTelephone),
      hShopRegAddress: new FormControl (this.hShop.hShopRegAddress),
      hShopRegDistrict: new FormControl (this.hShop.hShopRegDistrict),
      hShopRegShopName: new FormControl (this.hShop.hShopRegShopName),
      hShopRegShopDesc: new FormControl(this.hShop.hShopRegShopDesc),
      hShopRegShopEmail: new FormControl(this.hShop.hShopRegShopEmail),
      hShopRegShopAddress: new FormControl (this.hShop.hShopRegShopAddress),
      hShopRegShopDistrict: new FormControl (this.hShop.hShopRegShopDistrict),
      hShopRegShopPostalCode: new FormControl (this.hShop.hShopRegShopPostalCode),
      hShopRegShopLocation: new FormControl(this.hShop.hShopRegShopLocation),
      hShopRegShopTelephone: new FormControl (this.hShop.hShopRegShopTelephone)
    });
  }

    get hShopUpdateFormValidation(){
      return this.hShopUpdateFormGroup.controls;
    }

    updateHShop(){
      this.submitted = true;
      if(this.hShopUpdateFormGroup.invalid){
        return;
      }
  
      const hShop = this.hShopUpdateFormGroup.getRawValue();
      this.authService.updateHShop(hShop, this.hShopId).subscribe(s => this.router.navigate(['auth/signupsuccess']));
     }
}
