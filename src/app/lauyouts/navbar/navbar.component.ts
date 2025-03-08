import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLogin = input<boolean>(true);
  readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private subscriptions: Subscription = new Subscription();

  countCart!: number;
  ngOnInit(): void {
    this.cartService.cartNumber.subscribe({
      next: (value) => {
        this.countCart = value;
      },
    });
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartNumber.next(res.numOfCartItems);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
