import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-frist-banner',
  imports: [CarouselModule],
  templateUrl: './frist-banner.component.html',
  styleUrl: './frist-banner.component.css'
})
export class FristBannerComponent {
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
       items:1,
        nav: true
      }

}
