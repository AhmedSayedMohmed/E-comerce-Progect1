import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brandes/brand.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];

  private readonly brandService = inject(BrandService);
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.fetchBrands();
  }

  fetchBrands(): void {
    this.brandService.getBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
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
