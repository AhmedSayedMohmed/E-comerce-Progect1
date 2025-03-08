import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  private subscriptions: Subscription = new Subscription();

  cartId: string = '';
  checkoutForm: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [Validators.required]),
  });
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.cartId = res.get('id')!;
      },
    });
  }
  submitForm(): void {
    this.checkoutForm.value;
    this.orderService.chhOut(this.cartId, this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          open(res.session.url, '_self');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
