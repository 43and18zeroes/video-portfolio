import { Component } from '@angular/core';
import { YoutubeEmbed } from "../../components/youtube-embed/youtube-embed";
import { ContactForm } from "../../components/contact-form/contact-form";
import { Testimonial } from "../../components/testimonial/testimonial";

@Component({
  selector: 'app-hero',
  imports: [YoutubeEmbed, ContactForm, Testimonial],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
