import { Component, computed, inject, input } from '@angular/core';
import { YoutubeEmbed } from '../../components/youtube-embed/youtube-embed';
import { Testimonial } from '../../components/testimonial/testimonial';
import { I18nService } from '../../i18n/i18n';

@Component({
  selector: 'app-video-sample',
  imports: [YoutubeEmbed, Testimonial],
  templateUrl: './video-sample.html',
  styleUrl: './video-sample.scss',
  host: {
    '[class.is-reversed]': 'reverseDesktop()',
  },
})
export class VideoSample {
  private readonly i18n = inject(I18nService);

  sectionId = input<string>();
  /* Undefined falls back to the shared heading; an explicit empty string still
     hides it, the way the literal default used to. */
  title = input<string>();
  protected readonly heading = computed(() => this.title() ?? this.i18n.t().videoSample.attention);
  videoId = input.required<string>();
  text = input.required<string>();
  author = input.required<string>();
  imageName = input<string>('');

  reverseDesktop = input<boolean>(false);
}
