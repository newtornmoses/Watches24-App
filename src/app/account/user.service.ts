import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable, of, Subscription, BehaviorSubject } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 user: Observable<User>;
 userSubscription: Subscription;
 $user =  new BehaviorSubject([]);
 $userObsv = this.$user.asObservable();
 $paymentMthd =  new BehaviorSubject('');
 $paymentMthdObsv = this.$paymentMthd.asObservable();
 userscollection: AngularFirestoreCollection<User>;
 users : Observable<User>;
 userID: string;
 loading;
 load;

 $Logged_in_USerData = new BehaviorSubject([]); 
 $UserData  = this.$Logged_in_USerData.asObservable();

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, 
    private navCtr: NavController,
    private loader: LoadingController,
    private storage: Storage,
    private alert: AlertController
    ) { }

   // Register
  async doRegister(firstname,lastname, email, password){
    this.loading = await this.loader.create();
    await this.loading.present();
        this.auth.auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          if(!res) {
            this.loader.dismiss();
          }
          if(res) {
            
            this.AddUsertoUsers(res.user.uid,firstname, lastname, email )
            this.loader.dismiss();
          }
         
          
        
      } )
      .catch(err => {
        // console.log(err);
        
        this.loader.dismiss();
        this.alertControl('something went wrong', err.message)
      })
    }


    // add user details to storage
 AddUsertoUsers(id,firstname, lastname, email){
this.db.collection(`users`).add({
  uid: id,
  firstName: firstname,
  lastName: lastname,
  email: email

}).then(data => {
  this.loader.dismiss()
  this.navCtr.navigateForward("/address");
}

)
    }

  //Get users
  getuser() {
 this.auth.authState.
 subscribe(auth =>
  {
 
  if(auth) {
    // console.log(auth)
this.userscollection = this.db.collection('users', ref => ref.where('uid' ,'==', auth.uid));

 this.userscollection.snapshotChanges()
 .pipe(
  map(actions =>  actions.map(action => {
    
    
    const data = action.payload.doc.data()
    const id = action.payload.doc.id;
    this.storage.set('loggedUser',JSON.stringify({id, ...data}));
    this.userID = id;
    return {id, ...data}
  }))
  
 ).subscribe(data => {
    //  console.log('userService', data);
     this.$Logged_in_USerData.next(data);
    })

}else {
  this.navCtr.navigateForward("/login")
  }
})
}





// login with email
 async  EmailLogin(email, password){
    this.loading = await this.loader.create();
  await this.loading.present();
    //  try {
      this.auth.auth.signInWithEmailAndPassword(email, password)
    .then(user =>  {

      this.getuser();
  this.navCtr.navigateForward("/cart");
  this.loading.dismiss()

    }
      ).catch(err => {
        this.alertControl('something went wrong', err['code'])
        this.loading.dismiss()

      }
        )
  }


  // logout
  logout() {
    this.storage.remove('loggedUser');
    this.auth.auth.signOut();
    this.navCtr.navigateForward('/')

    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    
    }
   
  }


  // add Address
  addAddress(address, mobile, country, city,firstName, lastName) {

    this.loadingCreater()
    this.db.collection('users').doc(this.userID).update({
   address:[ 
     {
    address: address,
    mobile:  mobile,
    country: country,
    city:    city,
    firstName:firstName,
    lastName: lastName
   }
   ]
  })
  .then(data => {
    // this.navCtr.navigateForward('/payment');
    this.loader.dismiss();

  } )
  .catch(err => {
    this.loader.dismiss();
    this.alertControl('something wrong happened', err.message)
  })
  }

// Loader
 async loadingCreater(){
   this.load =  await this.loader.create();
   await this.load.present();
  }

  // cancle loader
 async CancelLoader() {
  await this.load.dismiss()
  }

  // alert controller
 async  alertControl(header, message) {
  const alert = await this.alert.create({
    header: 'Alert',
    subHeader: header,
    message: message,
    buttons: ['OK']
  });
  return await alert.present();
}


// navigation
goBack(route) {
  this.navCtr.navigateBack(route)
}

goForward(route) {
  this.navCtr.navigateForward(route)
}

}
