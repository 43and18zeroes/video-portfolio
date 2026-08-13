import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDemo01 } from './video-demo-01';

describe('VideoDemo01', () => {
  let component: VideoDemo01;
  let fixture: ComponentFixture<VideoDemo01>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoDemo01],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoDemo01);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
