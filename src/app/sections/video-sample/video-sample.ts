import { Component, input } from '@angular/core';
import { YoutubeEmbed } from '../../components/youtube-embed/youtube-embed';
import { Testimonial } from '../../components/testimonial/testimonial';


@Component({
  selector: 'app-video-sample',
  imports: [YoutubeEmbed, Testimonial],
  templateUrl: './video-sample.html',
  styleUrl: './video-sample.scss',
})
export class VideoSample {
  sectionId = input<string>();
  title = input<string>('Mehr als nur aneinandergereihte Clips');
  videoId = input.required<string>();
  text = input.required<string>();
  author = input.required<string>();

  reverseDesktop = input<boolean>(false);
}
