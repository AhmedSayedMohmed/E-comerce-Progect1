import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './lauyouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './lauyouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guardes/auth.guard';
import { loginGuard } from './core/guardes/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,canActivate:[loginGuard],
    children: [
      { path: 'Login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'Login' },
      { path: 'Register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: 'Register' },
      { path: 'forgetpassword', loadComponent: () => import('./pages/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent), title: 'forgetpassword' },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,canActivate:[authGuard],
    children: [
      { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Home' },
      { path: 'brandes', loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: 'Brands' },
      { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: 'Cart' },
      { path: 'categories', loadComponent: () => import('./pages/categores/categores.component').then(m => m.CategoresComponent), title: 'Categories' },
      { path: 'checkout/:id', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), title: 'Checkout' },
      { path: 'ollOrders', loadComponent: () => import('./pages/all-orders/all-orders.component').then(m => m.AllOrdersComponent), title: 'ollOrders' },
      { path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), title: 'Details' },
      { path: 'product', loadComponent: () => import('./pages/product/product.component').then(m => m.ProductComponent), title: 'Product' },
      { path: 'notfound', loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent), title: 'Not Found' },
      { path: '**', redirectTo: 'notfound' },
    ],
  },
];
