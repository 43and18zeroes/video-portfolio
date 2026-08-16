import { Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LegalDrawerService } from '../../legal-drawer';

@Component({
  selector: 'app-youtube-embed',
  imports: [],
  templateUrl: './youtube-embed.html',
  styleUrl: './youtube-embed.scss',
})
export class YoutubeEmbed {
  private sanitizer = inject(DomSanitizer);
  private legalDrawer = inject(LegalDrawerService);

  videoId = input.required<string>();
  isConsentGiven = signal(false);

  embedUrl = computed<SafeResourceUrl>(() => {
    const url = `https://www.youtube-nocookie.com/embed/${this.videoId()}?autoplay=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  grantConsent(): void {
    this.isConsentGiven.set(true);
  }

  openPrivacyPolicy(event: Event): void {
    event.preventDefault();
    this.legalDrawer.open('privacy-policy', 'section-youtube');
  }
}