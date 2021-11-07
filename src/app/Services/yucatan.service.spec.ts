import { TestBed } from '@angular/core/testing';

import { YucatanService } from './yucatan.service';

describe('YucatanService', () => {
  let service: YucatanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YucatanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
