// numbers.ts

import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChildren,
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

// Enough of a single figure has to be on screen that its count is not already
// over by the time it is looked at
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
  protected readonly t = inject(I18nService).t;
  private readonly destroyRef = inject(DestroyRef);

  private readonly statItems = viewChildren<ElementRef<HTMLElement>>('stat');
  private readonly frames = STATS.map(() => 0);

  protected readonly stats = STATS;
  protected readonly gaugeRadius = GAUGE_RADIUS;
  protected readonly circumference = 2 * Math.PI * GAUGE_RADIUS;

  /* One value per figure rather than one for the section. Stacked on a phone the
     three gauges sit far apart, so each starts when it reaches the viewport; in
     the three-column row from sd up they share a top edge and therefore still
     begin in the same frame. No breakpoint branch needed - the layout decides. */
  private readonly progress = signal<readonly number[]>(STATS.map(() => 0));

  // Figure and ring are both derived from progress, so they cannot drift apart
  protected readonly counted = computed(() =>
    STATS.map((stat, index) => Math.round(stat.value * this.progress()[index])),
  );
  protected readonly dashOffsets = computed(() =>
    this.progress().map((value) => this.circumference * (1 - value)),
  );

  constructor() {
    afterNextRender(() => this.watchForEntry());
    this.destroyRef.onDestroy(() => this.frames.forEach((frame) => cancelAnimationFrame(frame)));
  }

  private watchForEntry(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.showFinalValues();
      return;
    }

    const items = this.statItems().map((item) => item.nativeElement);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          // A figure counts once, so it stops being watched the moment it starts
          observer.unobserve(entry.target);
          this.countUp(items.indexOf(entry.target as HTMLElement));
        }
      },
      { threshold: VISIBLE_RATIO_TO_START },
    );

    items.forEach((item) => observer.observe(item));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private countUp(index: number): void {
    if (index < 0) {
      return;
    }

    const startedAt = performance.now();

    const step = (now: number) => {
      const elapsed = Math.min((now - startedAt) / COUNT_DURATION, 1);
      // Ease out, so the figure rushes up and settles rather than crawling linearly
      const eased = 1 - Math.pow(1 - elapsed, 3);

      this.setProgress(index, eased);

      if (elapsed < 1) {
        this.frames[index] = requestAnimationFrame(step);
      }
    };

    this.frames[index] = requestAnimationFrame(step);
  }

  private setProgress(index: number, value: number): void {
    this.progress.update((current) =>
      current.map((previous, i) => (i === index ? value : previous)),
    );
  }

  private showFinalValues(): void {
    this.progress.set(STATS.map(() => 1));
  }
}
