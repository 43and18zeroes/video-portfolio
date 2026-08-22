import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { Header } from "./components/layout/header/header";
import { Hero } from './sections/hero/hero';
import { VideoSample } from './sections/video-sample/video-sample';
import { Imprint } from './components/legal/imprint/imprint';
import { PrivacyPolicy } from './components/legal/privacy-policy/privacy-policy';
import { Footer } from "./components/layout/footer/footer";
import { LegalDrawerService } from './legal-drawer';
import { AboutMe } from "./sections/about-me/about-me";
import { Contact } from "./sections/contact/contact";

@Component({
  selector: 'app-root',
  imports: [Header, Hero, VideoSample, Imprint, PrivacyPolicy, Footer, AboutMe, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CMW Media');
  private legalDrawer = inject(LegalDrawerService);

  protected readonly activeLegalView = this.legalDrawer.activeView;

  constructor() {
    effect(() => {
      document.body.style.overflow = this.activeLegalView() ? 'hidden' : '';
    });

    effect(() => {
      const view = this.activeLegalView();
      const target = this.legalDrawer.scrollTarget();
      if (view && target) {
        setTimeout(() => {
          document.getElementById(target)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      }
    });

    effect((onCleanup) => {
      const view = this.activeLegalView();
      if (view) {
        history.pushState({ drawerOpen: true }, '');

        const handlePopState = () => {
          this.legalDrawer.close();
        };

        window.addEventListener('popstate', handlePopState);

        onCleanup(() => {
          window.removeEventListener('popstate', handlePopState);
          if (history.state?.drawerOpen) {
            history.back();
          }
        });
      }
    });
  }

  protected openLegal(type: 'imprint' | 'privacy-policy'): void {
    this.legalDrawer.open(type);
  }

  protected closeLegal(): void {
    this.legalDrawer.close();
  }

  @HostListener('window:keydown.escape')
  protected handleEscape(): void {
    if (this.activeLegalView()) {
      this.closeLegal();
    }
  }
}