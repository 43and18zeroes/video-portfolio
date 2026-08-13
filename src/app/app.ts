import { Component, signal } from '@angular/core';
import { Header } from "./components/header/header";
import { Hero } from './sections/hero/hero';
import { VideoSample } from "./components/video-sample/video-sample";

@Component({
  selector: 'app-root',
  imports: [Header, Hero, VideoSample],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CWM Media');
}
