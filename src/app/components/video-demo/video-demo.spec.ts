import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDemo } from './video-demo';

describe('VideoDemo', () => {
  let component: VideoDemo;
  let fixture: ComponentFixture<VideoDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
