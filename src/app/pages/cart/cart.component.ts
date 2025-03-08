import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  cartDetails: Icart = {} as Icart;
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  isLoading: boolean = true;
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    const cartSubscription = this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
    this.subscriptions.add(cartSubscription);
  }

  clearCart(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        const clearSubscription = this.cartService.clearCart().subscribe({
          next: (res) => {
            if (res.message === 'success') {
              this.cartDetails = {} as Icart;
              this.cartService.cartNumber.next(0);
              this.toastrService.success(
                'Cart cleared successfully',
                'FreshCart'
              );
            }
          },
          error: (err) => {
            this.toastrService.error('Failed to clear cart', 'Error');
          },
        });
        this.subscriptions.add(clearSubscription);
      }
    });
  }

  updateProduct(id: string, count: number): void {
    const updateSubscription = this.cartService
      .updateProductCart(id, count)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.cartDetails = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.subscriptions.add(updateSubscription);
  }

  removeItems(productId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        const removeSubscription = this.cartService
          .removeProductCart(productId)
          .subscribe({
            next: (res) => {
              this.toastrService.success(res.message, 'FreshCart');
              this.getCartData();
              this.cartService.cartNumber.next(res.numOfCartItems);
            },
            error: (err) => {
              this.toastrService.error('Failed to remove product', 'Error');
            },
          });
        this.subscriptions.add(removeSubscription);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
