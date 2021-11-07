/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InMemoryAdminDataService } from './in-memory-admin-data.service';

describe('Service: InMemoryAdminData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryAdminDataService]
    });
  });

  it('should ...', inject([InMemoryAdminDataService], (service: InMemoryAdminDataService) => {
    expect(service).toBeTruthy();
  }));
});
