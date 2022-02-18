import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/model/userRegistration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{

  user: User | any;
  userSubscription: Subscription | any;
  public searchTerm: string = "";

  /**
   * injecting servises
   * @param router 
   * @param authService 
   */
  constructor(private router: Router, private authService: AuthService) { 
    this.authService.findMe().subscribe(user => (this.user = user));
    this.userSubscription = this.authService.user.subscribe(user => (this.user = user));
  }
  search(event: any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/'])
  }
  
  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
}

