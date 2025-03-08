import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategorey } from '../../shared/interfaces/icategorey';
import { FristBannerComponent } from './frist-banner/frist-banner.component';
import { ScondeBannerComponent } from './sconde-banner/sconde-banner.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [FristBannerComponent, ScondeBannerComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Iproduct[] = [];
  category: Icategorey[] = [];
  isLoading: boolean = true;
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private subscriptions: Subscription = new Subscription();
  ngOnInit(): void {
    this.getProductsData();
    this.getCategoryData();
  }
  getProductsData(): void {
    this.productsService.getAllProduct().subscribe({
      next: (res) => {
        this.products = res.data;
        this.isLoading = false;
        /* console.log(this.products); */
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  getCategoryData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.category = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(res.message, 'FreshCart');
        this.cartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {},
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
