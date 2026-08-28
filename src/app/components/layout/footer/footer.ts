import { Component, inject, output } from '@angular/core';
import { I18nService } from '../../../i18n/i18n';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly t = inject(I18nService).t;

  readonly openLegal = output<'imprint' | 'privacy-policy'>();
  protected readonly currentYear = new Date().getFullYear();
}
