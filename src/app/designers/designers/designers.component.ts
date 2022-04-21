import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { Designer } from '@core/model/designerRegistration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-designers',
  templateUrl: './designers.component.html',
  styleUrls: ['./designers.component.css']
})
export class DesignersComponent implements OnInit {

  designers: Designer[] = [];
  designerSubscription: Subscription | any;
  email: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getDesigners();
    this.designerSubscription = this.authService.getDesignersStream().subscribe((designers: Designer[]) => {
      this.designers = designers;
    });
 
  }

  ngOnDestroy() {
    this.designerSubscription.unsubscribe();
  }

  goInnerPage(designer: any) {
    this.email = designer.designerRegShopEmail;
    this.router.navigate([`designers/`+`${designer._id}`+`/${this.email}`]);
  }
}
