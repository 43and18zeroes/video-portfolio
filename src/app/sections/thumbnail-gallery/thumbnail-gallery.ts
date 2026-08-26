// thumbnail-gallery.ts

import { afterNextRender, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import type { SwiperContainer } from 'swiper/element';

registerSwiperElements();

interface Thumbnail {
  readonly src: string;
  readonly title: string;
  readonly ctr: string;
}

interface ThumbnailSlide extends Thumbnail {
  readonly id: number;
}

const THUMBNAILS: readonly Thumbnail[] = [
  { src: 'img/thumbnail-gallery/thumbnail-01.jpg', title: 'Challenge Content', ctr: '+14.8% CTR' },
  { src: 'img/thumbnail-gallery/thumbnail-02.jpg', title: 'Tech Review', ctr: '+18.2% CTR' },
  { src: 'img/thumbnail-gallery/thumbnail-03.jpg', title: 'Finance Talk', ctr: '+12.5% CTR' },
  { src: 'img/thumbnail-gallery/thumbnail-04.jpg', title: 'Vlog & Travel', ctr: '+16.0% CTR' },
];

// Swiper's loop mode needs more slides than are visible at once
// (slidesPerView + looped slides). Four sources are not enough on wide
// screens, so the list is repeated. Drop this once enough thumbnails exist.
const MIN_SLIDES_FOR_LOOP = 8;

function buildLoopSafeSlides(thumbnails: readonly Thumbnail[], minSlides: number): readonly ThumbnailSlide[] {
  const repetitions = Math.max(1, Math.ceil(minSlides / thumbnails.length));

  return Array.from({ length: repetitions * thumbnails.length }, (_, index) => ({
    ...thumbnails[index % thumbnails.length],
    id: index,
  }));
}

@Component({
  selector: 'app-thumbnail-gallery',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './thumbnail-gallery.html',
  styleUrl: './thumbnail-gallery.scss',
})
export class ThumbnailGallery {
  private readonly swiperEl = viewChild.required<ElementRef<SwiperContainer>>('swiper');

  protected readonly slides = buildLoopSafeSlides(THUMBNAILS, MIN_SLIDES_FOR_LOOP);

  constructor() {
    // Swiper builds its loop exactly once, during initialization. The element
    // is therefore started with init="false" and only initialized after
    // Angular has rendered the slides into its light DOM.
    afterNextRender(() => this.initializeSwiper());
  }

  private initializeSwiper(): void {
    const swiperEl = this.swiperEl().nativeElement;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      swiperEl.autoplay = false;
    }

    swiperEl.initialize();
  }
}