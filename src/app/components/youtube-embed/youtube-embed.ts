import { Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LegalDrawerService } from '../../legal-drawer';
import { I18nService } from '../../i18n/i18n';

@Component({
  selector: 'app-youtube-embed',
  imports: [],
  templateUrl: './youtube-embed.html',
  styleUrl: './youtube-embed.scss',
})
export class YoutubeEmbed {
  private sanitizer = inject(DomSanitizer);
  private legalDrawer = inject(LegalDrawerService);

  protected readonly t = inject(I18nService).t;

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
