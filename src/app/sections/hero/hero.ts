import { Component } from '@angular/core';
import { YoutubeEmbed } from "../../components/youtube-embed/youtube-embed";

@Component({
  selector: 'app-hero',
  imports: [YoutubeEmbed],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
}
