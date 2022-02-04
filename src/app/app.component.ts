import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/userRegistration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{

  user: User | any;
  userSubscription: Subscription | any;
  
  constructor(private router: Router, private authService: AuthService) { 
    this.userSubscription = 
    this.authService.user.subscribe(user => (this.user = user));
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['loginsignup'])
  }

  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
}

