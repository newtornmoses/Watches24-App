import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'product-details', loadChildren: './product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'shop', loadChildren: './shop/shop.module#ShopPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'header', loadChildren: './header/header.module#HeaderPageModule' },
  { path: 'cart-modal', loadChildren: './cart-modal/cart-modal.module#CartModalPageModule' },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'signup', loadChildren: './account/signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './account/login/login.module#LoginPageModule' },
  { path: 'myaccount', loadChildren: './account/myaccount/myaccount.module#MyaccountPageModule' },
  { path: 'orders', loadChildren: './account/orders/orders.module#OrdersPageModule' },
  { path: 'returns', loadChildren: './account/returns/returns.module#ReturnsPageModule' },
  { path: 'vochers', loadChildren: './account/vochers/vochers.module#VochersPageModule' },
  { path: 'address', loadChildren: './account/address/address.module#AddressPageModule' },
  { path: 'product-collection', loadChildren: './product-collection/product-collection.module#ProductCollectionPageModule' },
  { path: 'footer', loadChildren: './footer/footer.module#FooterPageModule' },
  { path: 'men', loadChildren: './collection/men/men.module#MenPageModule' },
  { path: 'women', loadChildren: './collection/women/women.module#WomenPageModule' },
  { path: 'payment', loadChildren: './account/payment/payment.module#PaymentPageModule' },
  { path: 'settings', loadChildren: './account/settings/settings.module#SettingsPageModule' },
  { path: 'checkout', loadChildren: './account/checkout/checkout.module#CheckoutPageModule' },
  { path: 'payment-form', loadChildren: './payment-form/payment-form.module#PaymentFormPageModule' },
  { path: 'pay', loadChildren: './account/pay/pay.module#PayPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
