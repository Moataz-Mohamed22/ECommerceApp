
import { Routes } from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { ProductsDetailsComponent } from './shop/products-details/products-details.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },

  {
    path: 'shop',
    component: ShopComponent,
    data: { title: 'Shop' }
  },

  {
    path: 'products-details/:id',
    component: ProductsDetailsComponent,
    data: { title: 'Product Details' }
  },

  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About Us' }
  },

  {
    path: 'best-sellers',
    component: BestSellerComponent,
    data: { title: 'Best Sellers' }
  },

  {
    path: '**',
    redirectTo: 'home'
  }

];
