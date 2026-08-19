import { Component } from '@angular/core';
import { YoutubeEmbed } from "../../components/youtube-embed/youtube-embed";
import { ContactForm } from "../../components/contact-form/contact-form";
import { TestimonialCompact } from "../../components/testimonial-comps/testimonial-compact/testimonial-compact";

@Component({
  selector: 'app-hero',
  imports: [YoutubeEmbed, ContactForm, TestimonialCompact],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
