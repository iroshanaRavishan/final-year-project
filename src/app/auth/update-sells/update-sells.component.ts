import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { AllSells } from '@core/model/allSells';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-sells',
  templateUrl: './update-sells.component.html',
  styleUrls: ['./update-sells.component.css']
})
export class UpdateSellsComponent implements OnInit {

  @Input() Order:any;

  submitted = false;
  order: any[]=[];
  itemName: any;
  sellId: any;
  orderStatus!: FormGroup;
  buttonDisabled: boolean = true;
  temp: any;
  relSell: any;
  itemIdU: any;
  hShopsItem: any[]=[];
  
  allSells: AllSells[] = [];
  allSellsSubscription: Subscription | any;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sellId = this.activatedRoute.snapshot.paramMap.get("id");

    this.authService.getAllSells();
    this.allSellsSubscription = this.authService.getAllSellsStream().subscribe((hShopsItems: AllSells[]) => {
      for (const hShopsItem of hShopsItems) {
          this.hShopsItem.push(hShopsItem);
      }
      for (let index = 0; index < this.hShopsItem.length; index++) {
        if(this.sellId==this.hShopsItem[index]._id){
          this.relSell=(this.hShopsItem[index]);   
        } 
      }
    });
    this.createOrderStatus();  
  }

  createOrderStatus(){
    this.orderStatus = new FormGroup({
      sts: new FormControl ('', [Validators.required]),  
    });
  }

  get orderValidation(){
    return this.orderStatus.controls;
  }

  buttonToggle() {  
    let rbv = this.relSell.sts;
    this.orderStatus.patchValue({ sts: rbv });
    this.buttonDisabled = !this.buttonDisabled;
  }

  backNavigation() {
    this.router.navigate(['auth/shopssignup']);
  }

  updateStatus() {
    this.submitted = true;
    if(this.orderStatus.invalid){
      return;
    }
    const status = this.orderStatus.getRawValue();
    this.authService.updateSell(status, this.sellId).subscribe(s => this.router.navigate([`auth/shopssignup`])); 
  }
}