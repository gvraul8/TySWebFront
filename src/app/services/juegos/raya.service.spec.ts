import { TestBed } from '@angular/core/testing';

import { RayaService } from './raya.service';

describe('RayaService', () => {
  let service: RayaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RayaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
