import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  removeItems(productId: string) {
    throw new Error('Method not implemented.');
  }
  myToken: any = localStorage.getItem('userToken');
  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0);
  constructor(private httpClient: HttpClient) {}
  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: id,
      },
      {
        headers: {
          token: this.myToken,
        },
      }
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: this.myToken,
      },
    });
  }
  removeProductCart(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: {
          token: this.myToken,
        },
      }
    );
  }
  clearCart(): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: {
          token: this.myToken,
        },
      }
    );
  }
  updateProductCart(id: string, count: number): Observable<any> {
    return this.httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: {
          token: this.myToken,
        },
      }
    );
  }
}
