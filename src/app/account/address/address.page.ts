import { CartService } from './../../services/cart.service';
import { Storage } from '@ionic/storage';
import { User } from './../../models/user';
import { UserService } from './../user.service';
import { Countries } from './../../Mock-data/countries';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
countriesList = [];
dial_code = '+1';
user:User;
firstName: string;
lastName:string;
address: string;
mobile: string;
country: string;
city: string;
number:string;
loading;
addressAvailable: Boolean = false;
AddressList = [];

  constructor(private countries: Countries, 
    private userService: UserService,
    private storage: Storage,
    private cart: CartService
  
    
    ) {

      this.cart.cartNotEmpty()

   }




  // selectedCountry
  selectedCountry(e){
this.country = e.detail.value
  }

  // continueToPayment
  continueToPayment() {
    this.userService.goForward('/payment')
  }

  ShowAddAddress(){
    this.addressAvailable = false;
  }


 async ionViewWillEnter() {
this.storage.get('loggedUser').then(data =>  {
  
  if(data) {
    const userData = JSON.parse(data)
    this.firstName = userData['firstName'];
    this.lastName = userData['lastName'];
  
    if(userData['address'] && userData['address'].length > 0) {

      this.addressAvailable =  true;
  
      this.AddressList = userData['address'] 
    } 
  
  }
  
});


  }


  addAddress() {
  this.mobile = this.dial_code + this.number;
  this.userService.addAddress(this.address, this.mobile, this.country, this.city, this.firstName, this.lastName)
  this.addressAvailable = true;
  }


  // cancel
  cancel() {
    // console.log('canceled');
    
    this.addressAvailable = true;
  }



  // goBack
  goBack() {
    this.userService.goBack('/cart')
  }

  // Get user Data
   async userData() {
     
    //      const k = await this.userService.$UserData.subscribe(data => console.log(data)
    //      );
    //  console.log(k)
     
  }

   ngOnInit() {

    this.countriesList = this.countries.getCountryList();
    this.userService.getuser();
  

    
  }

}
