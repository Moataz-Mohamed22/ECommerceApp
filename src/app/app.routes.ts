import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
    loadComponent: () => import('./shop/shop.component').then(m => m.ShopComponent),
    data: { title: 'Shop' }
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
    data: { title: 'Cart' }
  },

  {
    path: 'products-details/:id',
    loadComponent: () => import('./shop/products-details/products-details.component').then(m => m.ProductsDetailsComponent),
    data: { title: 'Product Details' }
  },

  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent),
    data: { title: 'About Us' }
  },

  {
    path: 'best-sellers',
    loadComponent: () => import('./best-seller/best-seller.component').then(m => m.BestSellerComponent),
    data: { title: 'Best Sellers' }
  },

  {
    path: '**',
    redirectTo: 'home'
  }

];
