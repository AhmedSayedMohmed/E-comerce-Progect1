import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategorey } from '../../../shared/interfaces/icategorey';


@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}
  getAllCategories(): Observable<any> {
    return this.httpClient.get<Icategorey>(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }
  getSpasificCategories(id: string): Observable<any> {
    return this.httpClient.get<Icategorey>(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
  }
}
