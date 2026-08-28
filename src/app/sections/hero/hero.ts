import { Component, inject } from '@angular/core';
import { YoutubeEmbed } from '../../components/youtube-embed/youtube-embed';
import { ContactForm } from '../../components/contact-form/contact-form';
import { Testimonial } from '../../components/testimonial/testimonial';
import { I18nService } from '../../i18n/i18n';

@Component({
  selector: 'app-hero',
  imports: [YoutubeEmbed, ContactForm, Testimonial],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly t = inject(I18nService).t;
}
