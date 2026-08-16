import { TestBed } from '@angular/core/testing';

import { LegalDrawer } from './legal-drawer';

describe('LegalDrawer', () => {
  let service: LegalDrawer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalDrawer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
