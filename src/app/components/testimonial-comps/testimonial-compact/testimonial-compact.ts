import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-testimonial-compact',
  imports: [],
  templateUrl: './testimonial-compact.html',
  styleUrl: './testimonial-compact.scss',
})
export class TestimonialCompact {
  @Input() imageName = '';
  @Input() text = '';
  @Input() author = '';
  @Input() stars = 5;

  get starArray(): number[] {
    return Array.from({ length: this.stars });
  }
}
