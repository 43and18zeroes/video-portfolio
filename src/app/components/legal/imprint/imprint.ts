import { Component } from '@angular/core';
import { LEGAL_DATA } from '../../../private-data.config';

@Component({
  selector: 'app-imprint',
  imports: [],
  templateUrl: './imprint.html',
  styleUrls: ['../legal.scss', './imprint.scss'],
})
export class Imprint {
  imprint = LEGAL_DATA;
}
