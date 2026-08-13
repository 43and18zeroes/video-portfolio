import { Component } from '@angular/core';
import { YoutubeEmbed } from "../../components/youtube-embed/youtube-embed";
import { Testimonial } from "../../components/testimonial/testimonial";

@Component({
  selector: 'app-video-demo-00',
  imports: [YoutubeEmbed, Testimonial],
  templateUrl: './video-demo-00.html',
  styleUrl: './video-demo-00.scss',
})
export class VideoDemo00 {}
