import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  detailProduct: Iproduct | null = null;
  isLoading: boolean = true;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
   private readonly cartService = inject(CartService);
    private readonly toastrService = inject(ToastrService);
    private subscriptions: Subscription = new Subscription();
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        let productId = res.get('id');
        return this.productsService.getSpasificProduct(productId).subscribe({
          next: (res) => {
            this.detailProduct = res.data;
            this.isLoading = false;
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
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

