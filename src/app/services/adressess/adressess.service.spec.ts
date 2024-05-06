import { TestBed } from '@angular/core/testing';

import { AdressessService } from './adressess.service';

describe('AdressessService', () => {
  let service: AdressessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdressessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
