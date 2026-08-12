import { Component, signal } from '@angular/core';
import { Header } from "./components/header/header";
import { Hero } from './sections/hero/hero';

@Component({
  selector: 'app-root',
  imports: [Header, Hero],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CWM Media');
}
