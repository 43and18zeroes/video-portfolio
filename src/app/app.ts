import { Component, signal } from '@angular/core';
import { Header } from "./components/header/header";
import { Hero } from './sections/hero/hero';
import { VideoDemo } from "./components/video-demo/video-demo";

@Component({
  selector: 'app-root',
  imports: [Header, Hero, VideoDemo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CWM Media');
}
