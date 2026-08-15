import { Component, HostListener, signal } from '@angular/core';
import { Header } from "./components/layout/header/header";
import { Hero } from './sections/hero/hero';
import { VideoSample } from "./components/video-sample/video-sample";
import { Imprint } from './components/legal/imprint/imprint';
import { PrivacyPolicy } from './components/legal/privacy-policy/privacy-policy';
import { Footer } from "./components/layout/footer/footer";

@Component({
  selector: 'app-root',
  imports: [Header, Hero, VideoSample, Imprint, PrivacyPolicy, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CMW Media');
  protected readonly activeLegalView = signal<'impressum' | 'datenschutz' | null>(null);

  protected openLegal(type: 'impressum' | 'datenschutz'): void {
    this.activeLegalView.set(type);
    document.body.style.overflow = 'hidden';
  }

  protected closeLegal(): void {
    this.activeLegalView.set(null);
    document.body.style.overflow = '';
  }

  @HostListener('window:keydown.escape')
  protected handleEscape(): void {
    if (this.activeLegalView()) {
      this.closeLegal();
    }
  }
}