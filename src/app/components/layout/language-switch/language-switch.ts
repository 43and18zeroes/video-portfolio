// language-switch.ts

import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../i18n/i18n';

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
  protected readonly label = computed(() => this.target().toUpperCase());

  protected toggle(): void {
    this.i18n.toggle();
  }
}
