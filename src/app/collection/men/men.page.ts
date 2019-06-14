import { CartService } from './../../services/cart.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ShopService } from './../../services/shop.service';



@Component({
  selector: 'app-men',
  templateUrl: './men.page.html',
  styleUrls: ['./men.page.scss'],
})
export class MenPage implements OnInit {

  productAddedToCart = []
  products: Product[];
  constructor(private service: ShopService, private cart: CartService) {
  
  }

 async loadcontent() {
  await this.service.fetch_products().subscribe(data => this.products = data.filter(cat => cat.collection ==='Men'))

  }

   // addToCart
   async addToCart(product) {
    this.productAddedToCart = []
    this.productAddedToCart.push(product)
    await this.cart.addtoCart( this.productAddedToCart); 
  }

  ionViewDidEnter() {
   this.loadcontent()

  }
  ngOnInit() {
  }

}
