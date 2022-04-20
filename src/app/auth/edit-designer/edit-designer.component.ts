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
 
    designerId:any;
    submitted = false;
    designerRegGroup!: FormGroup;

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
        designerRegShopTelephone: new FormControl (this.designer.designerRegShopTelephone)
      });
  }
  
    get designerRegFormValidation(){
      return this.designerRegGroup.controls;
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
