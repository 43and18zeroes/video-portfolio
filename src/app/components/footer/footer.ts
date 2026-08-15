import { Component, output } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly openLegal = output<'impressum' | 'datenschutz'>();
  protected readonly currentYear = new Date().getFullYear();
}
