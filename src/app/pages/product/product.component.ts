import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/Product/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icategorey } from '../../shared/interfaces/icategorey';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  isLoading: boolean = true;
  private readonly productService = inject(ProductService);
  product: Iproduct[] = [];
  category: Icategorey[] = [];
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
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

