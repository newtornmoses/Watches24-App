import { ShopService } from './../services/shop.service';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {


  products: Product[];
  constructor(private service: ShopService) {
  
  }

 async loadcontent() {
  await this.service.fetch_products().subscribe(data => this.products = data)
   

  }

  ionViewDidEnter() {
   this.loadcontent()

  }
  ngAfterViewInit() {
   //this.loadcontent()
  }


  ngOnInit() {
    

  }

}
