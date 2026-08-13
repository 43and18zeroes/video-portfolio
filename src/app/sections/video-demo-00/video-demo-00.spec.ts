import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDemo00 } from './video-demo-00';

describe('VideoDemo00', () => {
  let component: VideoDemo00;
  let fixture: ComponentFixture<VideoDemo00>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoDemo00],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoDemo00);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
