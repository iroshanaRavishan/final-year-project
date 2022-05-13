import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';


@Component({
  selector: 'app-change-pass-designer',
  templateUrl: './change-pass-designer.component.html',
  styleUrls: ['./change-pass-designer.component.css']
})
export class ChangePassDesignerComponent implements OnInit {

  @Input() designer: any;
   
  designerId:any;
  submitted = false;
  designerRegGroup!: FormGroup;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.designerId = this.designer._id;
    console.log(this.designer._id);
    this.createDesignerRegForm();
  }

  createDesignerRegForm(){
    this.designerRegGroup = new FormGroup({
      designerRegEmail: new FormControl(this.designer.designerRegEmail),
      designerRegNewPassword: new FormControl (this.designer.designerRegNewPassword),
      designerRegOldPassword: new FormControl (this.designer.designerRegOldPassword),
      designerRegConfirmPassword: new FormControl (this.designer.designerRegConfirmPassword),
    });
  }

  get designerRegFormValidation(){
    return this.designerRegGroup.controls;
  }

  updatePassword() {
    this.submitted = true;
    if(this.designerRegGroup.invalid){
      return;
    }

    const designer = this.designerRegGroup.getRawValue();
    this.authService.updatePassword(designer, this.designerId).subscribe(s => this.router.navigate(['auth/signupsuccess']));
  }

  get designerRegUsername() {
    return this.designerRegGroup.get('designerRegUsername');
  }
  get designerRegEmail() {
    return this.designerRegGroup.get('designerRegEmail');
  }
  get designerRegNewPassword() {
    return this.designerRegGroup.get('designerRegPassword');
  }
  get designerRegOldPassword() {
    return this.designerRegGroup.get('designerRegOldPassword');
  }


//   bcrypt.compare(designerRegPassword, designer.designerHashedRegPassword, function(err, res) {
//     let a = res;
// });

}