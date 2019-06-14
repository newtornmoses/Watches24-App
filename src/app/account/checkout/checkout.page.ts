import { CartService } from './../../services/cart.service';
import { UserService } from './../user.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
subTotal = 0;
Vat = 0;
delivery = 0;
total = 0;


   constructor(
    private navCtr: NavController, 
    private userService:UserService,
    private cart: CartService,
    
    ) { 
     this.cart.cartNotEmpty();
     
    }

    ionViewWillEnter() {
     this.subTotal = this.cart.cart().Total_price;
     this.Vat =  parseInt((this.subTotal* 0.03).toFixed(3));
     this.delivery = 10;


     }
   

  goBack() {
    this.navCtr.navigateForward('/payment');
  }


  checkout(){
 this.total = this.subTotal + parseInt(this.Vat.toFixed(3)) + this.delivery;
  this.cart.SetStorage('TotalPrice', this.total);
  this.navCtr.navigateForward('/pay')
  }

  ngOnInit() {
    
  }

}
