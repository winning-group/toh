import { TestBed } from '@angular/core/testing';

import { VillainService } from './villain.service';

describe('VillainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VillainService = TestBed.get(VillainService);
    expect(service).toBeTruthy();
  });
});
