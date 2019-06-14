import { CartService } from './../../services/cart.service';
import { ShopService } from './../../services/shop.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-women',
  templateUrl: './women.page.html',
  styleUrls: ['./women.page.scss'],
})
export class WomenPage implements OnInit {
  productAddedToCart =[];
  products: Product[];
  constructor(private service: ShopService, private cart: CartService) {
  
  }

 async loadcontent() {
  await this.service.fetch_products().subscribe(data => this.products = data.filter(cat => cat.collection ==='Women'))
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
