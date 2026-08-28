// numbers.ts

import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import type { Dictionary } from '../../i18n/de';
import { I18nService } from '../../i18n/i18n';

/* The ids come from the dictionary, so a figure added here does not compile until
   both language files carry its wording. */
type StatId = keyof Dictionary['numbers']['stats'];

interface Stat {
  readonly id: StatId;
  /* Symbols, identical in every language. Unit, label and the spoken forms the
     visually hidden replacement uses all live in the dictionary. */
  readonly prefix: string;
  readonly value: number;
}

const STATS: readonly Stat[] = [
  { id: 'views', prefix: '>', value: 10 },
  { id: 'retention', prefix: '+', value: 35 },
  { id: 'turnaround', prefix: '<', value: 48 },
];

const COUNT_DURATION = 1100;

// Enough of the band has to be on screen that the count is not already over by
// the time it is looked at
const VISIBLE_RATIO_TO_START = 0.4;

// Radius inside the gauge's 0 0 100 100 viewBox, leaving room for the stroke and
// its glow to sit inside the element
const GAUGE_RADIUS = 44;

@Component({
  selector: 'app-numbers',
  imports: [],
  templateUrl: './numbers.html',
  styleUrl: './numbers.scss',
})
export class Numbers {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly t = inject(I18nService).t;
  private readonly destroyRef = inject(DestroyRef);

  private frame = 0;

  protected readonly stats = STATS;
  protected readonly counted = signal<readonly number[]>(STATS.map(() => 0));

  protected readonly gaugeRadius = GAUGE_RADIUS;
  protected readonly circumference = 2 * Math.PI * GAUGE_RADIUS;

  // Drives both the figures and the rings, so the two can never drift apart
  private readonly progress = signal(0);
  protected readonly dashOffset = computed(() => this.circumference * (1 - this.progress()));

  constructor() {
    afterNextRender(() => this.watchForEntry());
    this.destroyRef.onDestroy(() => cancelAnimationFrame(this.frame));
  }

  private watchForEntry(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.showFinalValues();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        // The figures only ever count once
        observer.disconnect();
        this.countUp();
      },
      { threshold: VISIBLE_RATIO_TO_START },
    );

    observer.observe(this.host.nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private countUp(): void {
    const startedAt = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / COUNT_DURATION, 1);
      // Ease out, so the figures rush up and settle rather than crawl linearly
      const eased = 1 - Math.pow(1 - progress, 3);

      this.counted.set(STATS.map((stat) => Math.round(stat.value * eased)));
      this.progress.set(eased);

      if (progress < 1) {
        this.frame = requestAnimationFrame(step);
      }
    };

    this.frame = requestAnimationFrame(step);
  }

  private showFinalValues(): void {
    this.counted.set(STATS.map((stat) => stat.value));
    this.progress.set(1);
  }
}
