import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  products: any;
  constructor( private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll()
      .subscribe(data => this.products = data );
    console.log(this.products);
  }


}
