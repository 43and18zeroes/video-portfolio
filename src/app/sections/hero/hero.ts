import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private sanitizer = inject(DomSanitizer);

  readonly videoId = 'WYKIPCdAI1U';

  isConsentGiven = signal(false);

  embedUrl = computed<SafeResourceUrl>(() => {
    const url = `https://www.youtube-nocookie.com/embed/${this.videoId}?autoplay=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  grantConsent(): void {
    this.isConsentGiven.set(true);
  }
}
