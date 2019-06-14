
import { Product } from './../models/product';
import { Injectable, } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import {map} from 'rxjs/operators'
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class ShopService {
$products = new BehaviorSubject(null);
$productsObs = this.$products.asObservable();
$FeaturedCollection = new BehaviorSubject([]);
$FeaturedCollectionObs = this.$FeaturedCollection.asObservable();
productCollection: AngularFirestoreCollection<Product>;
Products: Observable<Product[]>;
SliderCollection: AngularFirestoreCollection<Product>;
Sliders: Observable<Product[]>;
FeaturedCollection: AngularFirestoreCollection<Product>;
Featured: Observable<any>;
category = new BehaviorSubject('Men');


  constructor(private db: AngularFirestore, private storage: Storage ) {}






// Get products
fetch_products(){

 this.productCollection = this.db.collection<Product>('products');

 this.Products = this.productCollection.snapshotChanges().pipe(
     map(actions =>  actions.map(action =>{
        const data = action.payload.doc.data() as Product;
        const id = action.payload.doc.id;
        const newData = { id, ...data };
        this.$products.next( [newData] );
        return newData;

     }))
  )

  return this.Products;

}

// Featured Products
FetchFeaturedProducts() {
  this.FeaturedCollection = this.db.collection('featured_men_Collection');
  this.Featured = this.FeaturedCollection.snapshotChanges().pipe(
    map(actions => 
      actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
 
        const newData = { id, ...data };

        return newData;
       
      })
    )
  )
 
   
 
  return this.Featured;
 
 }
 

 //GetSelected Image
 async SetSelectedPdt(product, category) {
   console.log(category);
   
  this.category.next(category);
  this.storage.set('selectedProduct', product);

 
 }

 // destroy Storage
 destroy(){
   this.storage.remove('selectedProduct')
 }


//  LoadSelected Image
async LoadSelectedPdt() {
const Loadedproduct = await this.storage.get('selectedProduct');
this.$FeaturedCollectionObs.subscribe(data => console.log('featured', data))
return JSON.parse(Loadedproduct);
}

// Get Slider  Images
fetchSlider(){
 this.SliderCollection = this.db.collection('slider_collection');
 this.Sliders = this.SliderCollection.valueChanges()
 return this.Sliders;
 }






//  Merge observables
MergedCollection() {
  const combine =  combineLatest(this.FetchFeaturedProducts(), this.fetchSlider()).pipe(
      map(([featured_prodts, slider]) => {
        return {featured_prodts, slider}
      }
    ))
    return combine;
  };

}

