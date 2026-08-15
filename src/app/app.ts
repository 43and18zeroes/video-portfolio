import { Component, HostListener, signal } from '@angular/core';
import { Header } from "./components/header/header";
import { Hero } from './sections/hero/hero';
import { VideoSample } from "./components/video-sample/video-sample";
import { Impressum } from './components/impressum/impressum';
import { Datenschutz } from './components/datenschutz/datenschutz';
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [Header, Hero, VideoSample, Impressum, Datenschutz, Footer],
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