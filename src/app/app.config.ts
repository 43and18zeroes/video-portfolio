import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

/* No provideRouter here: navigation is in-page anchor scrolling and nothing in the
   app uses RouterOutlet, routerLink or the Router service. An empty route table
   still pulled the whole @angular/router package into the initial bundle. */
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners()],
};
