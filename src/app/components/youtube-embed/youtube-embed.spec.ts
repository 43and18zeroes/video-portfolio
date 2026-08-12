import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeEmbed } from './youtube-embed';

describe('YoutubeEmbed', () => {
  let component: YoutubeEmbed;
  let fixture: ComponentFixture<YoutubeEmbed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeEmbed],
    }).compileComponents();

    fixture = TestBed.createComponent(YoutubeEmbed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
