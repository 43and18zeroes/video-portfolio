import { Component, Input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './testimonial.html',
  styleUrl: './testimonial.scss',
})
export class Testimonial {
  @Input() imageName = '';
  @Input() text = '';
  @Input() author = '';
  @Input() stars = 5;
  @Input() variant: 'default' | 'compact' = 'default';

  get starArray(): number[] {
    return Array.from({ length: this.stars });
  }
}