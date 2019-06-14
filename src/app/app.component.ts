import { UserService } from './account/user.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My Bag',
      url: '/cart',
      icon: 'basket'
    },
    {
      title: 'Men Collection',
      url: '/men',
      icon: 'man'
    },
    {
      title: 'Women Collection',
      url: '/women',
      icon: 'woman'
    },

    {
      title: 'Add Payment',
      url: '/payment',
      icon: 'card'
    },

    {
      title: 'Account',
      url: '/account',
      icon: 'person'
    },
    {
      title: 'settings',
      url: '/shop',
      icon: 'settings'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  logout() {
  this.userService.logout();
  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
