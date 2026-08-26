import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-thumbnail-gallery',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './thumbnail-gallery.html',
  styleUrl: './thumbnail-gallery.scss',
})
export class ThumbnailGallery implements OnInit, AfterViewInit {
  @ViewChild('swiperEl') swiperEl?: ElementRef<HTMLElement & { swiper?: any }>;

  thumbnails = [
    { src: 'img/thumbnail-gallery/thumbnail-01.jpg', title: 'Challenge Content', ctr: '+14.8% CTR' },
    { src: 'img/thumbnail-gallery/thumbnail-02.jpg', title: 'Tech Review', ctr: '+18.2% CTR' },
    { src: 'img/thumbnail-gallery/thumbnail-03.jpg', title: 'Finance Talk', ctr: '+12.5% CTR' },
    { src: 'img/thumbnail-gallery/thumbnail-04.jpg', title: 'Vlog & Travel', ctr: '+16.0% CTR' }
  ];

  ngOnInit(): void {
    register();
  }

  ngAfterViewInit(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && this.swiperEl?.nativeElement) {
      this.swiperEl.nativeElement.addEventListener('swiperinit', () => {
        const swiperInstance = (this.swiperEl!.nativeElement as any).swiper;
        swiperInstance?.autoplay?.stop();
      });
    }
  }
}