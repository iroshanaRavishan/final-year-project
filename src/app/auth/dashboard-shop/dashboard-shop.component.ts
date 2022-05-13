import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { AllSells } from '@core/model/allSells';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { Summery } from '@core/model/summery';

@Component({
  selector: 'app-dashboard-shop',
  templateUrl: './dashboard-shop.component.html',
  styleUrls: ['./dashboard-shop.component.css']
})
export class DashboardShopComponent implements OnInit {

  @Input() hShop: any;

  Order: any;
  sellsId: any;
  hShopId: any;
  count: number = 0;
  earnings: number = 0;
  hs: any[]=[];
  AllSummery: Summery[] = [];
  chart: any;
  dateTime: Date | undefined;
  month: number=0;
  hrs: number = 0;
  hrsCount: number = 0;
  minutes: number = 0;
  day: number = 0;
  lable: number[]= []

  summeryForm!: FormGroup;
  hShopPassUpdateGroup!: FormGroup;

  // ['0st','2nd','3rd','4th','5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', 
  // '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st']

  allSells: AllSells[] = [];
  allSellsSubscription: Subscription | any;
  summerySubscription: Subscription | any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
    this.hShopId = this.hShop._id;
    this.authService.getAllSells();
    this.allSellsSubscription = this.authService.getAllSellsStream().subscribe((allSells: AllSells[]) => {
      for (const allSell of allSells) {
        if(this.hShopId==allSell.shopId){
          this.allSells.push(allSell);
        } 
      }
      for (let index = 0; index < this.allSells.length; index++) {
        this.count = 1 + index;
        this.earnings = this.earnings + parseInt( this.allSells[index].total, 10);
      }
    });

    this.authService.getAllSummery();
    this.summerySubscription = this.authService.getAllSummeryStream().subscribe((allSummeries: Summery[]) => {
      for (const allSummery of allSummeries) {
        if(this.hShopId==allSummery.shopId){
          this.AllSummery.push(allSummery);
        } 
      }
        console.log(this.AllSummery);
      });
    
    this.chart = document.getElementById('summery_chart');
    this.dateTime = new Date();
    this.month = new Date().getMonth() +1;

    if(this.month==1) {
      for (let i = 1; i <= 31; i++) {
        this.lable.push(i);
      }
    }
    if(this.month==2) {
      for (let i = 1; i <= 28; i++) {
        this.lable.push(i);
      }
    }
    if(this.month==3) {
      for (let i = 1; i <= 31; i++) {
        this.lable.push(i);
      }
    }
    if(this.month==4) {
      for (let i = 1; i <= 30; i++) {
        this.lable.push(i);
      }
    }
    if(this.month==5) {
      for (let i = 1; i <= 31; i++) {
        this.lable.push(i);
      }
    }
    if(this.month==6) {
      for (let i = 1; i <= 30; i++) {
        this.lable.push(i);
      }
    }
    if(this.month==7) {
      for (let i = 1; i <= 31; i++) {
        this.lable.push(i);
      }
    }
    if(this.month==8) {
      for (let i = 1; i <= 31; i++) {
        this.lable.push(i);
      }
    }
    if(this.month==9) {
      for (let i = 1; i <= 30; i++) {
        this.lable.push(i);
      }
    }
    if(this.month==10) {
      for (let i = 1; i <= 31; i++) {
        this.lable.push(i);
      }
    }
    if(this.month==11) {
      for (let i = 1; i <= 30; i++) {
        this.lable.push(i);
      }
    }
    if(this.month==12) {
      for (let i = 1; i <= 32; i++) {
        this.lable.push(i);
      }
    }

    this.hrs = new Date().getHours();
    this.minutes = new Date().getMinutes();
    this.day = new Date().getDate();

    // if ((this.hrs >= 10) && this.minutes >= 25) {
    //   this.hrsCount = this.hrsCount + 1;
    //   this.counting();
    // }
  
    Chart.register(...registerables);
    this.loadChart();

  }

  summery() {
    if ((this.hrs >= 10) && this.minutes >= 0) {
      this.hrsCount = this.hrsCount + 1;
      this.counting();
    }
    else {
      console.log('time is not set');
    }
  }
  counting(){
    this.summeryForm = new FormGroup({
      shopId: new FormControl(this.hShopId),
      no: new FormControl(this.count),
      earnings: new FormControl (this.earnings),  
      previouseD: new FormControl(this.day)
    });
    this.submittingCount();
  }

  submittingCount(){
    if(this.summeryForm.invalid){
      return;
    }
    const summery: File = this.summeryForm.getRawValue();
    this.authService.summery(summery).subscribe(s => this.router.navigate(['shops/']));;
  }

  loadChart(): void {
    new Chart(this.chart, {
      type: 'line',
      data: {
        datasets: [{
          data: [1, 0, 2, 1, 1, 1, 1, 1], 
          label: ' Daily sells ',
          backgroundColor: '#ec1e1e',
        
          borderColor: '#ec1e1e'
        },
        {
          data: [40296, 40296, 80605, 101103, 103703, 135703, 143503, 149363],
          label: 'Income',
          backgroundColor: '#f5df1c',
        
          borderColor: '#f5df1c'
        },
        
        ],
        labels: this.lable
      },
      
      options: {
        responsive: true,
        maintainAspectRatio:true,
        scales: {
          y: {
            grid: {
            
            },
            beginAtZero: true,
          },
          x: {
            grid: {
              display: false
            },
            beginAtZero: true,
            
          }
        }
      }
    });
  }

  ngOnDestroy() {
    //this.allSellsSubscription.unsubscribe();
  }
}
