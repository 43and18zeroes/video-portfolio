import { Component } from '@angular/core';
import { YoutubeEmbed } from "../../components/youtube-embed/youtube-embed";
import { Testimonial } from "../../components/testimonial/testimonial";

@Component({
  selector: 'app-video-demo-01',
  imports: [YoutubeEmbed, Testimonial],
  templateUrl: './video-demo-01.html',
  styleUrl: './video-demo-01.scss',
})
export class VideoDemo01 {}
