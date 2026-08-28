import { Component, inject } from '@angular/core';
import { Technologies } from './technologies/technologies';
import { I18nService } from '../../i18n/i18n';

@Component({
  selector: 'app-about-me',
  imports: [Technologies],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {
  protected readonly t = inject(I18nService).t;
}
