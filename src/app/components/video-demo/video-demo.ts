import { Component, input } from '@angular/core';
import { YoutubeEmbed } from "../youtube-embed/youtube-embed";
import { Testimonial } from "../testimonial/testimonial";

@Component({
  selector: 'app-video-demo',
  imports: [YoutubeEmbed, Testimonial],
  templateUrl: './video-demo.html',
  styleUrl: './video-demo.scss',
})
export class VideoDemo {
  title = input<string>('Mehr als nur aneinandergereihte Clips');
  videoId = input.required<string>();
  text = input.required<string>();
  author = input.required<string>();

  reverseDesktop = input<boolean>(false);
}
