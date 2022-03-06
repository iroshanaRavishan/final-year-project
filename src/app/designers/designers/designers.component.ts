import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { Designer } from '@core/model/designerRegistration';
import { ProductDataService } from '@core/products/product-data.service';
import { Observable, Subscription } from 'rxjs';
import { DesignersModule } from '../designers.module';

@Component({
  selector: 'app-designers',
  templateUrl: './designers.component.html',
  styleUrls: ['./designers.component.css']
})
export class DesignersComponent implements OnInit {

  designers: Designer[] = [];
  designerSubscription: Subscription | any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getDesigners();
    this.designerSubscription = this.authService.getDesignersStream().subscribe((designers: Designer[]) => {
        this.designers = designers;
      });
  }

  ngOnDestroy() {
    this.designerSubscription.unsubscribe();
  }
}
