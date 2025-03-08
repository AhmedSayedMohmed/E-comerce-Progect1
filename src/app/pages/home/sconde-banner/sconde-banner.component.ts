import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Icategorey } from '../../../shared/interfaces/icategorey';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-sconde-banner',
  imports: [CarouselModule],
  templateUrl: './sconde-banner.component.html',
  styleUrl: './sconde-banner.component.css'
})
export class ScondeBannerComponent {
   category: Icategorey[]=[];
    private readonly categoriesService = inject(CategoriesService);
    getCategoryData(): void {
      this.categoriesService.getAllCategories().subscribe({
        next: (res) => {
          console.log(res.data);
          this.category=res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    ngOnInit(): void {
      this.getCategoryData();
    }
    /* ====================== Carouseloption====================== */

    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      autoplay:true,
      autoplaySpeed:800,
      autoplayTimeout:1000,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 8
        }
      },
      nav: true
    }

}
