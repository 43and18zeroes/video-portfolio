import { Component } from '@angular/core';
import { IMPRINT_DATA } from '../../../private-data.config';

@Component({
  selector: 'app-imprint',
  imports: [],
  templateUrl: './imprint.html',
  styleUrls: ['../legal.scss', './imprint.scss'],
})
export class Imprint {
  imprint = IMPRINT_DATA;
}
