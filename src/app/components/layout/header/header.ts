import { Component, inject } from '@angular/core';
import { I18nService } from '../../../i18n/i18n';
import { LanguageSwitch } from '../language-switch/language-switch';

@Component({
  selector: 'app-header',
  imports: [LanguageSwitch],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly i18n = inject(I18nService);

  protected readonly t = this.i18n.t;
  protected readonly swapPhase = this.i18n.swapPhase;

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
