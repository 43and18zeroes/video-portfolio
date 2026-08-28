import { Component } from '@angular/core';
import { Technologies } from './technologies/technologies';

@Component({
  selector: 'app-about-me',
  imports: [Technologies],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {}
