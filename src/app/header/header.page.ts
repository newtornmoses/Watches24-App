import { NavController } from '@ionic/angular';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  totalCartItems: number;

  constructor(private cart: CartService, private nvtr: NavController) {
    this.cart.$cartObservable.subscribe(data => this.totalCartItems = data['Total_Qty'])
   }


  //  ShowCart
  ShowCart() {
 this.nvtr.navigateForward('/cart')
  }

  // goHome
  goHome() {
 this.nvtr.navigateForward('/')

  }

  ngOnInit() {
  }

}
