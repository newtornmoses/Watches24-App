import { CartService } from './../../services/cart.service';
import { NavController } from '@ionic/angular';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
selectedPaymentMethod: string;
  constructor(
    private userService:UserService, 
    private navCtr:NavController ,
    private cart: CartService
    ) { 
      this.cart.cartNotEmpty();
    }
  selectedPayment(e) {
    this.selectedPaymentMethod = e;
   this.userService.$paymentMthd.next(e);
  }

  // checkout
  continuePayment() {
   this.navCtr.navigateForward('/checkout');
  }

  // goBack
  goBack() {
    this.userService.goBack('/address')
  }

  
  ngOnInit() {
   
  }

}
