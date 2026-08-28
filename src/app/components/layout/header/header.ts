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
  protected readonly t = inject(I18nService).t;

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
