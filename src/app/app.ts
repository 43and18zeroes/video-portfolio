import { Component, signal } from '@angular/core';
import { Header } from "./components/header/header";
import { Hero } from './sections/hero/hero';
import { VideoDemo00 } from "./sections/video-demo-00/video-demo-00";
import { VideoDemo01 } from "./sections/video-demo-01/video-demo-01";

@Component({
  selector: 'app-root',
  imports: [Header, Hero, VideoDemo00, VideoDemo01],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CWM Media');
}
