import { CartService } from './../services/cart.service';
import { Cart } from './../models/cart';
import { NavController, IonContent } from '@ionic/angular';
import { Product } from './../models/product';
import { Observable, Subscription } from 'rxjs';
import { ShopService } from './../services/shop.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  productDetails = [];
  ProductsYouMayLike:Product[];
  selectedCategory
  category: any;
  selectedPdt;
  Featuredproducts = [];
  @ViewChild(IonContent) content: IonContent;   

  constructor(private service: ShopService, private navCTR: NavController, private cartService: CartService) {
  this.service.category.subscribe(data => this.category = data);
  this.service.$FeaturedCollectionObs.subscribe(data => this.Featuredproducts = data);
   }


  // addToCart
  addToCart(title) {
    this.cartService.addtoCart(this.productDetails)
    
    // this.cartService.$cartCollection.next([])
    this.navCTR.navigateForward('/cart')
    
  }

  cart(){
    
  }

   //viewDetails
   viewDetails(id, category) {
   this.content.scrollToTop(500);
     
    this.productDetails = this.Featuredproducts.filter(products => products.id === id);
    console.log(this.selectedPdt);
    
 
   
   }


  // Get Selected image
  async GetSelectedImage(){
    this.productDetails = await this.service.LoadSelectedPdt();
    
    this.service.$FeaturedCollectionObs.subscribe(data => {
      console.log(data);
      console.log(this.category);
      
      this.ProductsYouMayLike = data.filter(product => product.Category === this.category);
    
    })


  }

 

  ngAfterViewInit() {
    
  }

  ngOnDestroy(){
    this.service.destroy()
  }

  ngOnInit() {
    this.GetSelectedImage();
  }

}
