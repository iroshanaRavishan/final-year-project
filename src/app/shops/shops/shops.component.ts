import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '@core/products/product-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {


  products: Observable<any> | any;
  constructor(private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.products = this.productDataService.getAllProducts();
  }

}
