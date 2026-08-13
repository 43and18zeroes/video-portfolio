import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  imports: [],
  templateUrl: './testimonial.html',
  styleUrl: './testimonial.scss',
})
export class Testimonial {
  @Input() text = '';
  @Input() author = '';
  @Input() stars = 5;

  get starArray(): number[] {
    return Array.from({ length: this.stars });
  }
}
