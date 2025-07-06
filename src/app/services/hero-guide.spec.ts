import { TestBed } from '@angular/core/testing';

import { HeroGuide } from './hero-guide';

describe('HeroGuide', () => {
  let service: HeroGuide;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroGuide);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
