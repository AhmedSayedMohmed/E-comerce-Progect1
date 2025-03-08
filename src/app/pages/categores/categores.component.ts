import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategorey } from '../../shared/interfaces/icategorey';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categores',
  imports: [],
  templateUrl: './categores.component.html',
  styleUrl: './categores.component.css',
})
export class CategoresComponent implements OnInit {
  category: Icategorey[] = [];
  private readonly categoriesService = inject(CategoriesService);
  private subscriptions: Subscription = new Subscription();
  isLoading: boolean = true;
  getCategoryData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.category = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  ngOnInit(): void {
    this.getCategoryData();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
