// i18n.ts

import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { de, type Dictionary } from './de';
import { en } from './en';

export type Lang = 'de' | 'en';

const DICTIONARIES: Record<Lang, Dictionary> = { de, en };
const STORAGE_KEY = 'cmw-media.lang';
const DEFAULT_LANG: Lang = 'de';

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'de' || stored === 'en' ? stored : DEFAULT_LANG;
  } catch {
    // Private mode or blocked storage
    return DEFAULT_LANG;
  }
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly meta = inject(Meta);

  /* Resolved in the field initializer, so it is settled before any template that
     injects this service is evaluated. The first render is therefore already in
     the stored language and nothing swaps over afterwards. */
  private readonly language = signal<Lang>(readStoredLang());

  readonly lang = this.language.asReadonly();
  readonly t = computed(() => DICTIONARIES[this.language()]);

  /* The switcher always points at the language you are not reading */
  readonly otherLang = computed<Lang>(() => (this.language() === 'de' ? 'en' : 'de'));

  private readonly switchCount = signal(0);

  /* Alternates between two values so the swap animation restarts on every change:
     a CSS animation does not re-run while its name stays the same. Null until the
     first switch, which keeps the animation off the initial page load. */
  readonly swapPhase = computed<'a' | 'b' | null>(() => {
    const count = this.switchCount();
    return count === 0 ? null : count % 2 === 1 ? 'a' : 'b';
  });

  constructor() {
    effect(() => {
      const lang = this.language();
      document.documentElement.lang = lang;
      this.meta.updateTag({ name: 'description', content: DICTIONARIES[lang].meta.description });
    });
  }

  toggle(): void {
    this.set(this.otherLang());
  }

  set(lang: Lang): void {
    if (lang === this.language()) {
      return;
    }

    this.switchCount.update((count) => count + 1);
    this.language.set(lang);

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Choice stays for this session only
    }
  }
}
