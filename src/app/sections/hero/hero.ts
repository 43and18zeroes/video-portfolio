import { Component } from '@angular/core';
import { YoutubeEmbed } from "../../components/youtube-embed/youtube-embed";
import { ContactForm } from "../../components/contact-form/contact-form";

@Component({
  selector: 'app-hero',
  imports: [YoutubeEmbed, ContactForm],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
}
