import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { Header } from './components/layout/header/header';
import { Hero } from './sections/hero/hero';
import { VideoSample } from './sections/video-sample/video-sample';
import { Imprint } from './components/legal/imprint/imprint';
import { PrivacyPolicy } from './components/legal/privacy-policy/privacy-policy';
import { Footer } from './components/layout/footer/footer';
import { LegalDrawerService } from './legal-drawer';
import { AboutMe } from './sections/about-me/about-me';
import { Contact } from './sections/contact/contact';
import { ThumbnailGallery } from './sections/thumbnail-gallery/thumbnail-gallery';
import { Numbers } from './sections/numbers/numbers';
import { I18nService } from './i18n/i18n';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    VideoSample,
    Imprint,
    PrivacyPolicy,
    Footer,
    AboutMe,
    Contact,
    ThumbnailGallery,
    Numbers,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('CMW Media');
  private legalDrawer = inject(LegalDrawerService);
  private i18n = inject(I18nService);

  protected readonly t = this.i18n.t;
  protected readonly lang = this.i18n.lang;
  protected readonly swapPhase = this.i18n.swapPhase;
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
          document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      }
    });

    /* The panel says aria-modal="true", which tells assistive tech that everything
       outside is inert. Nothing enforced that: focus never entered the dialog, the
       28 controls behind it stayed reachable by Tab, and closing dropped focus on
       the body. This effect makes the claim true for as long as the panel is up. */
    effect((onCleanup) => {
      if (!this.activeLegalView()) {
        return;
      }

      const openedFrom = document.activeElement as HTMLElement | null;

      // The panel is created by @if in this very pass, so it cannot be focused yet
      const moveFocusIn = setTimeout(() => {
        this.drawerFocusable()[0]?.focus();
      });

      const keepFocusInside = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') {
          return;
        }

        const focusable = this.drawerFocusable();
        if (!focusable.length) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        const panel = document.querySelector('.drawer-panel');

        if (!active || !panel?.contains(active)) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      };

      document.addEventListener('keydown', keepFocusInside);

      onCleanup(() => {
        clearTimeout(moveFocusIn);
        document.removeEventListener('keydown', keepFocusInside);
        // Back to whatever opened the drawer, not to the top of the document
        openedFrom?.focus();
      });
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

  /* Only what is really reachable: the legal texts scroll inside the panel, so
     links further down count too, but nothing hidden does. */
  private drawerFocusable(): HTMLElement[] {
    const panel = document.querySelector('.drawer-panel');
    if (!panel) {
      return [];
    }

    const candidates = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    return Array.from(candidates).filter((element) => element.offsetParent !== null);
  }

  protected closeLegal(): void {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.legalDrawer.close();
  }

  @HostListener('window:keydown.escape')
  protected handleEscape(): void {
    if (this.activeLegalView()) {
      this.closeLegal();
    }
  }
}
