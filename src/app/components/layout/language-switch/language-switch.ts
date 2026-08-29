// language-switch.ts

import { Component, computed, inject } from '@angular/core';
import { I18nService, type Lang } from '../../../i18n/i18n';

/* Both codes stay in the DOM at once so the track can roll from one to the other
   rather than swapping the text in place. The order here fixes which way it
   travels, and it keeps the labels derived from the Lang type instead of being
   written into the template by hand. */
const SWITCH_ORDER: readonly Lang[] = ['en', 'de'];

@Component({
  selector: 'app-language-switch',
  imports: [],
  templateUrl: './language-switch.html',
  styleUrl: './language-switch.scss',
})
export class LanguageSwitch {
  private readonly i18n = inject(I18nService);

  protected readonly t = this.i18n.t;
  protected readonly target = this.i18n.otherLang;

  protected readonly options = SWITCH_ORDER.map((lang) => ({ lang, label: lang.toUpperCase() }));
  protected readonly showsSecond = computed(() => this.target() === SWITCH_ORDER[1]);

  protected toggle(): void {
    this.i18n.toggle();
  }
}
