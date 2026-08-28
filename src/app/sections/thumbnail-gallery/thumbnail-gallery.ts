// thumbnail-gallery.ts

import {
  afterNextRender,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import type { Dictionary } from '../../i18n/de';
import { I18nService } from '../../i18n/i18n';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import type { SwiperContainer } from 'swiper/element';

registerSwiperElements();

/* Derived from the dictionary, so a thumbnail added here does not compile until
   both language files carry its alt text. */
type ThumbnailId = keyof Dictionary['gallery']['thumbnails'];

interface Thumbnail {
  readonly id: ThumbnailId;
  readonly src: string;
}

/* `key` is the position in the repeated loop list, `id` stays the source it was
   built from — several slides share one id. */
interface ThumbnailSlide extends Thumbnail {
  readonly key: number;
}

const THUMBNAILS: readonly Thumbnail[] = [
  { id: 'powerbank', src: 'img/thumbnail-gallery/thumbnail-01.jpg' },
  { id: 'scaling', src: 'img/thumbnail-gallery/thumbnail-02.jpg' },
  { id: 'dayOne', src: 'img/thumbnail-gallery/thumbnail-03.jpg' },
  { id: 'tutorial', src: 'img/thumbnail-gallery/thumbnail-04.jpg' },
  { id: 'noLimits', src: 'img/thumbnail-gallery/thumbnail-05.jpg' },
];

// Swiper reorders slides around the active one to fake the loop, and needs roughly
// ceil(slidesPerView) + loop-additional-slides of them on *each* side. Five sources
// cannot cover both sides on a wide screen, which leaves Swiper centred on the last
// source at startup and makes realIndex jump. Repeating the list gives it room; the
// pagination stays at one bullet per source. Drop this once enough real thumbnails
// exist to satisfy the budget on their own.
const MIN_SLIDES_FOR_LOOP = 12;

function buildLoopSafeSlides(
  thumbnails: readonly Thumbnail[],
  minSlides: number,
): readonly ThumbnailSlide[] {
  const repetitions = Math.max(1, Math.ceil(minSlides / thumbnails.length));

  return Array.from({ length: repetitions * thumbnails.length }, (_, index) => ({
    ...thumbnails[index % thumbnails.length],
    key: index,
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
  protected readonly t = inject(I18nService).t;

  protected readonly thumbnails = THUMBNAILS;
  protected readonly slides = buildLoopSafeSlides(THUMBNAILS, MIN_SLIDES_FOR_LOOP);
  protected readonly activeThumbnail = signal(0);

  constructor() {
    // Swiper builds its loop exactly once, during initialization. The element
    // is therefore started with init="false" and only initialized after
    // Angular has rendered the slides into its light DOM.
    afterNextRender(() => this.initializeSwiper());
  }

  protected onRealIndexChange(): void {
    this.syncActiveThumbnail();
  }

  protected goToThumbnail(index: number): void {
    const swiper = this.swiperEl().nativeElement.swiper;
    swiper.slideToLoop(this.nearestSlideFor(index, swiper.realIndex));
  }

  private initializeSwiper(): void {
    const swiperEl = this.swiperEl().nativeElement;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      swiperEl.autoplay = false;
    }

    swiperEl.initialize();

    // Building the loop leaves an arbitrary repetition centred, so the first
    // source is selected explicitly and without an animation
    swiperEl.swiper.slideToLoop(0, 0);
    this.syncActiveThumbnail();
  }

  private syncActiveThumbnail(): void {
    const { realIndex } = this.swiperEl().nativeElement.swiper;
    this.activeThumbnail.set(realIndex % THUMBNAILS.length);
  }

  // Every source sits in the list several times, so a bullet targets whichever of
  // its copies is closest and the carousel travels the short way round.
  private nearestSlideFor(thumbnailIndex: number, from: number): number {
    const total = this.slides.length;
    let nearest = thumbnailIndex;
    let shortest = Number.POSITIVE_INFINITY;

    for (let slide = thumbnailIndex; slide < total; slide += THUMBNAILS.length) {
      const forward = (slide - from + total) % total;
      const distance = Math.min(forward, total - forward);

      if (distance < shortest) {
        shortest = distance;
        nearest = slide;
      }
    }

    return nearest;
  }
}
