import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSample } from './video-sample';

describe('VideoSample', () => {
  let component: VideoSample;
  let fixture: ComponentFixture<VideoSample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSample],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoSample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
