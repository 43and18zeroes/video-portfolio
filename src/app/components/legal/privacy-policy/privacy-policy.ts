import { Component } from '@angular/core';
import { LEGAL_DATA } from '../../../private-data.config';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.html',
  styleUrls: ['../legal.scss', './privacy-policy.scss'],
})
export class PrivacyPolicy {
  privacy = LEGAL_DATA;
}
