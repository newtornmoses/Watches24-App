import { CartModalPage } from './../cart-modal/cart-modal.page';
import { CartService } from './../services/cart.service';
import { ShopPage } from './../shop/shop.page';
import { Product } from './../models/product';
import { ShopService } from './../services/shop.service';
import { Component, OnInit ,AfterViewInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit , AfterViewInit{
Featuredproducts: Product[];
FeaturedMenProducts: Product[];
FeaturedWomenProducts: Product[];
slides;
selectedPdt = { };
productAddedToCart = [];

  constructor(private service: ShopService,  
    private navCTR:NavController,
     private cart:CartService,
     private modalCtr: ModalController
     ) {
   
    this.service.FetchFeaturedProducts().subscribe(data => {
      //  console.log('FetchFeaturedProducts',data);
       this.service.$FeaturedCollection.next(data)    
       this.Featuredproducts = data;
       this.FeaturedMenProducts = [...this.Featuredproducts].filter(elem => elem.Category === 'Men').slice(0, 4);
       this.FeaturedWomenProducts = [...this.Featuredproducts].filter(elem => elem.Category === 'Women').slice(0, 4);
       
    })
    
    
  }

    // addToCart
    async addToCart(product) {
      this.productAddedToCart = []
      this.productAddedToCart.push(product)
      await this.cart.addtoCart( this.productAddedToCart);
 
    }

    //viewDetails
    viewDetails(id, category) {
     this.selectedPdt =this.Featuredproducts.filter(products => products.id === id);
    this.service.SetSelectedPdt(JSON.stringify(this.selectedPdt), category)
    //  console.log(category);
    this.navCTR.navigateForward('/product-details')
    }

  
  ngAfterViewInit() {
    this.service.destroy()
  }

  slideOpts = {
  
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 5000,
    },
  };



  // loadMenProducts
  loadMenProducts() {
this.navCTR.navigateForward('/shop')
  }


  ngOnInit() {
    

  }
}
