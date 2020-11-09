import { TestBed } from '@angular/core/testing';

import { CountryHttpService } from './country-http.service';

describe('CountryHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountryHttpService = TestBed.get(CountryHttpService);
    expect(service).toBeTruthy();
  });
});
