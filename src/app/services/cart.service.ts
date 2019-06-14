import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ShopService } from './shop.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  $cartCollection = new BehaviorSubject({});
  $cartObservable = this.$cartCollection.asObservable(); 
  Total_price: number = 0;
  Total_Qty: number =0 ;
  item: {
    id:'',
    title: '',
    price: '',
    Qty: 1,
    image: ''
   };
  items = [];
  CartItems = {
    items : this.items,
    Total_Qty : this.Total_Qty || 0,
    Total_price: this.Total_price || 0

  };

  currentCart = {}
  OriginalCartItems = [];


  constructor(private  storage: Storage, private navCTR: NavController) { 
     
  }


  cart() {

    return this.CartItems;

   }

// add to caart
  addtoCart (product ) {
  this.OriginalCartItems.push(product[0])
  this.storage.set('originalItems', JSON.stringify(this.OriginalCartItems))

  const existProduct =   this.items.find(pdt => pdt.id === product[0].id  )
     if(existProduct ) {
     
        existProduct['Qty'] +=1;
        existProduct['price'] += product[0].selling_price;
        this.CartItems['Total_price'] += product[0].selling_price;
        this.CartItems['Total_Qty'] += 1
        // console.log(this.CartItems);
        this.$cartCollection.next(this.CartItems)
         
     } else{
 
    this.item = {
      id: product[0].id,
      title: product[0].title,
      price: product[0].selling_price,
      Qty: 1,
      image: product[0].image_URL
     };

    this.items.push(this.item);
     this.Total_price = this.CartItems.items.reduce((acc, value) => acc+ value.price, 0)
     this.Total_Qty = this.CartItems.items.reduce((acc, value) => acc+ value.Qty, 0)

    this.CartItems.items = this.items;
    this.CartItems.Total_Qty = this.Total_Qty;
    this.CartItems.Total_price = this.Total_price;
    this.$cartCollection.next(this.CartItems)
    // console.log(this.CartItems)


    
  } }



  // delete item from cart

  Delete_Item(product, i) {
    if(this.CartItems['items'].indexOf(product.id) === -1) {
      this.CartItems['items'].splice( i, 1);
      this.CartItems.Total_Qty -= product.Qty;
      this.CartItems.Total_price -= product.price;
      this.$cartCollection.next(this.CartItems)
    }
    
  }


  // update item Qty
  IncreaseQty(product) {
    this.storage.get('originalItems').then(data =>{

     const existProduct =   this.CartItems['items'].find(pdt => pdt.id === product.id  );
     const original_Cartitems = JSON.parse(data).find(products => products.id === product.id );
    if(existProduct ) {
       existProduct['Qty'] +=1;
       existProduct['price'] += original_Cartitems['selling_price'];
       this.CartItems['Total_price'] += original_Cartitems['selling_price'];
       this.CartItems['Total_Qty'] += 1
      //  console.log(this.CartItems);
       this.$cartCollection.next(this.CartItems)
       
  }
} )

}


  // update item Qty
  decreaseQty(product, i) {
    this.storage.get('originalItems').then(data =>{

      const existProduct =   this.CartItems['items'].find(pdt => pdt.id === product.id  );
      const original_Cartitems = JSON.parse(data).find(products => products.id === product.id );
      if(existProduct['Qty'] === 0) {
        this.CartItems['items'].splice(i, 1); 
        this.$cartCollection.next(this.CartItems)

       } else {
     if(existProduct ) {
       
        existProduct['Qty'] -=1;
        existProduct['price'] -= original_Cartitems['selling_price'];
        this.CartItems['Total_price'] -= original_Cartitems['selling_price'];
        this.CartItems['Total_Qty'] -= 1
        // console.log(this.CartItems);
        this.$cartCollection.next(this.CartItems)
        
   }
  }
 } )
    
  }

  // check cart if not emoty
  cartNotEmpty() {
this.$cartObservable.subscribe(data => {
  // console.log(data)
  if(data['items'] === undefined) {
    this.navCTR.navigateForward("/");
  }
})
  }

  // storage
  SetStorage(storeName,data) {
    this.storage.set(storeName, JSON.stringify(data))
  }

// getStorage
 async GetStorage(storeName){
 return await this.storage.get(storeName)
  }

    
}
    

