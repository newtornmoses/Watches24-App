
import { Subscription } from 'rxjs';

import { CartService } from './../../services/cart.service';
import { UserService } from './../user.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  PaymentMethod = '';
  PaymentSubscription: Subscription;
  expiryMonthArray = [];
  expiryYearArray = [];
  months = [];
  years = [];
  year = new Date().getUTCFullYear();
  ExpMth: string;
  Expyr:string;
  name:number;
  card:string;
  COD = 10;
  total = 0;


  constructor(
     
    private navCtr: NavController, 
    private userService:UserService,
    private cart: CartService,
   

    ) { 
      this.cart.cartNotEmpty();
     this.PaymentSubscription = this.userService.$paymentMthdObsv.subscribe(data => {
      if(data) {
       this.PaymentMethod = data;
      //  console.log('payment', data)
       this.cart.SetStorage('paymentOption', JSON.stringify(data));
      } else {
        this.cart.GetStorage('paymentOption').then(storedOption => {
          if(storedOption && storedOption.length > 0) {
            this.PaymentMethod = JSON.parse(storedOption);
          }
      }
        )

     }
   })
  
    }

    CardExpiry() {}

    ionViewWillEnter() {
    
    this.cart.GetStorage('TotalPrice').then(price => this.total = JSON.parse(price));

    
        

    }

    goBack() {
      this.navCtr.navigateBack('/checkout')
    }

    ngOnDestroy() {
      if(this.PaymentSubscription) {
        this.PaymentSubscription.unsubscribe();
      }
    }


    //   get expiryMonth
expiryMonth() {
  for(let i: any = 1; i < 13; i++) {
      if(i < 10) {
        i = '0'+ i;
        
      }
      else{ i = '' + i }
      this.expiryMonthArray.push(i)
      
    }
   
    
    
}


//   get expiryYear
expiryYear() {
for(var i = 0; i < 20; i++) {

  this.expiryYearArray.push(this.year++)
}

}




// check out
async checkout() {

  await this.userService.loadingCreater()
  const data = {
    'name': this.name,
    'card': this.card,
    'ExpMth': this.ExpMth,
    'Expyr': this.Expyr,
  }

  // console.log(data);
 
}





  ngOnInit() {
   this.expiryMonth();
   this.expiryYear();
   
      
  }

}

