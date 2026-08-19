import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialCompact } from './testimonial-compact';

describe('TestimonialCompact', () => {
  let component: TestimonialCompact;
  let fixture: ComponentFixture<TestimonialCompact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialCompact],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialCompact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
