import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  CartCollection = {}
  quantity;
  constructor(private cartService: CartService) {
     this.cartService.$cartObservable.subscribe(data => this.CartCollection = data )
   }

//  delete item from cart
   delete(product, i){
     this.cartService.Delete_Item(product, i) 
   }


  //  increment by one
  add(product) {
    
    this.cartService.IncreaseQty(product)
  }

  //  decrement by one
  decrease(product, i) {
    this.cartService.decreaseQty(product, i)
  }
  

  ngOnInit() {


  }

}
