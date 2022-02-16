import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '@core/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-designers',
  templateUrl: './designers.component.html',
  styleUrls: ['./designers.component.css']
})
export class DesignersComponent implements OnInit {


  products: Observable<any> | any;
  constructor(private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.products = this.productDataService.getAllProducts();
  }
}
