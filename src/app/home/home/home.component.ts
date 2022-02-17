import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '@core/products/product-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  products: Observable<any> | any;
  constructor(private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.products = this.productDataService.getAllProducts();
  }
}
