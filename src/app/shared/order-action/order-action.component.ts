import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { HShopItems } from '@core/model/hShopItemsRegistration';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-order-action',
  templateUrl: './order-action.component.html',
  styleUrls: ['./order-action.component.css']
})
export class OrderActionComponent implements OnInit {

  idOfItem: any;
  typeOfVender: any;
  hShopsItem: any[] = [];
  relItem: any;
  type: any;
  q: string | any;
  quentity: number = 0;
  fp: string | any;
  finalPrice: number = 0;
  price: number | any =0;
  sf:string | any;
  shippingFee: number = 0;
  total: number = 0;
  totalLastPrice: any;
  trueValue: any;
  pr:string|any;
  last: number | any=0;
  error: string | any;
  success: any;
  name: any;
  shopId: any;
  userLogEmail: string | any;
  userLogPassword: string | any;
  
  userDetails!: FormGroup;
  shippingDetails!: FormGroup;
  allDetails!: FormGroup;
  submitted = false;
  submittedAll = false;
  siteKey: any;
  submittedShippingD = false;
  errorMsg: string = '';
  readOnlyToggle: string = 'true';
  method : any;
  de: any[] = [];
  token: string|undefined;

  hShopItemSubscription: Subscription | any;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router)  {
    this.token = undefined;
  }
  public send(form: NgForm, id: any): void {
    this.submitted = true;
    if ((form.invalid) || (this.userDetails.invalid)) {
      if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }
      if(this.userDetails.invalid){
        return;
      }
      return;
    }   
    this.validatingUser();
    this.idSignup = id;
    console.debug(`Token [${this.token}] generated`);
  }

  ngOnInit(): void {
    this.siteKey = environment.recaptcha.siteKey;
    this.shopId = this.activatedRoute.snapshot.paramMap.get("sid")
    this.idOfItem = this.activatedRoute.snapshot.paramMap.get("id");
    this.typeOfVender = this.activatedRoute.snapshot.paramMap.get("type"); 
    this.q = this.activatedRoute.snapshot.paramMap.get("quentity");
    this.quentity = parseInt(this.q,  10);
    this.fp = this.activatedRoute.snapshot.paramMap.get("finalprice");
    this.finalPrice = parseFloat(this.fp);
    this.sf = this.activatedRoute.snapshot.paramMap.get("shippingfee");
    this.shippingFee = parseFloat(this.sf);

    this.authService.getHShopsItems();
    this.hShopItemSubscription = this.authService.getHShopsItemsStream().subscribe((hShopsItems: HShopItems[]) => {
      
      for (const hShopsItem of hShopsItems) {
          this.hShopsItem.push(hShopsItem);
      }
      for (let index = 0; index < this.hShopsItem.length; index++) {
        if(this.idOfItem==this.hShopsItem[index]._id){
          this.relItem=(this.hShopsItem[index]);
          console.log(this.relItem);
          this.price = this.relItem.price;
          this.name = this.relItem.name
          this.last = (this.price * this.quentity) + this.shippingFee;
          this.totalLastPrice = (this.price * this.quentity) + this.shippingFee;
        } 
      }
    });
    this.user();
    this.shipping();
    this.all();
  }

 user() {
    this.userDetails = new FormGroup({
     fullName: new FormControl ('', Validators.required),
     useremail: new FormControl('', [Validators.required]),
     password: new FormControl ('', [Validators.required]),
     telephone: new FormControl ('', [Validators.required]),
     address: new FormControl ('', [Validators.required]),
     district: new FormControl (''),
     zipcode: new FormControl ('', [Validators.required])
    });
  }

  shipping() {
    this.shippingDetails = new FormGroup({
      collectAt: new FormControl ('', [Validators.required])
    });
  }

  all() {
    this.allDetails = new FormGroup({      
      fullName: new FormControl (this.userDetails.value.fullName),
      useremail: new FormControl(this.userDetails.value.useremail),
      telephone: new FormControl (this.userDetails.value.telephone),
      address: new FormControl (this.userDetails.value.address),
      district: new FormControl (this.userDetails.value.district),
      zipcode: new FormControl (this.userDetails.value.zipcode),
      collectAt: new FormControl (this.shippingDetails.value.collectAt),
      payementType: new FormControl ('', [Validators.required]),
      venderType: new FormControl (this.typeOfVender),
      sts: new FormControl ('To be reviewed'),
      itemId: new FormControl (this.idOfItem),    
      itemName: new FormControl (this.name), 
      total: new FormControl (this.last),
      shopId: new FormControl (this.shopId),
      quentity: new FormControl (this.quentity),
      shippingFee: new FormControl (this.shippingFee)
    });
  }

  validatingUser(){
    this.error = '';
    this.authService.validatingUser(this.userDetails.value.useremail, this.userDetails.value.password).subscribe((s) => {this.success = s}, e => (this.error = e));
  }

  get userFormValidation(){
    return this.userDetails.controls;
  }

  get shippingFormValidation(){
    return this.shippingDetails.controls;
  }

  get allFormValidation(){
    return this.allDetails.controls;
  }

  onlineToggle($event: any) {
    if ($event.target.value=='online'){
      this.method = true;
    }
    this.method = !this.method;
  }

  paymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Ravishan'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: this.last.toFixed(2),
      currencyCode: 'LKR',
      countryCode: 'BE'
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION']
  };

  onLoadPaymentData = (
    event: Event
  ): void => {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail);
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData
    ) => {
      console.log('payment authorized', paymentData);
      return {
        transactionState: 'SUCCESS'
      };
    }

  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  }

  idSignup:any = "userSU";
  tabChangesignup(id:any){
    console.log(id);
    this.idSignup = id;
  }

  shippingChecking(id: any) {
    if(this.error=='') {
      this.submittedShippingD = true;
      if(!this.shippingDetails.invalid){
        this.idSignup = id;
      }
    }
    else {
      return
    }
    if (this.success) {
      this.error=''
    }
    if (!(this.success)) {
      this.error='Your login details could not be verified. Please go back and enter a password!'
    }
    else {
      return
    }
  }
  allChecking(){
    this.submittedAll = true;
    if(this.allDetails.invalid){
      return;
    }

    const fullName = this.userDetails.value.fullName;
    const useremail = this.userDetails.value.useremail;
    const telephone = this.userDetails.value.telephone;
    const address = this.userDetails.value.address;
    const district = this.userDetails.value.district;
    const zipcode = this.userDetails.value.zipcode;
    const collectAt = this.shippingDetails.value.collectAt;
    const sts = 'To be reviewed';
    const itemName = this.relItem.name;
    const totalLastPrice = parseFloat(this.totalLastPrice).toFixed(2);
    const shopId = this.shopId;  
    const quentity = this.quentity;
    const shippingFee = this.shippingFee.toFixed(2);

    this.allDetails.patchValue({ fullName: fullName });
    this.allDetails.patchValue({ useremail: useremail });
    this.allDetails.patchValue({ telephone: telephone });
    this.allDetails.patchValue({ address: address });
    this.allDetails.patchValue({ district: district });
    this.allDetails.patchValue({ zipcode: zipcode });
    this.allDetails.patchValue({ collectAt: collectAt }); 
    this.allDetails.patchValue({ sts: sts});
    this.allDetails.patchValue({ itemName: itemName }); 
    this.allDetails.patchValue({ total: totalLastPrice});
    this.allDetails.patchValue({ shopId: shopId});
    this.allDetails.patchValue({ quentity: quentity});
    this.allDetails.patchValue({ shippingFee: shippingFee});

   const user: File = this.allDetails.getRawValue();
   this.authService.confirmedOrderDetail(user).subscribe(s => this.router.navigate(['shops/']));
  }
}
