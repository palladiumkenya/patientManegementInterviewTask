import { TestBed, inject } from '@angular/core/testing';

import { PatientResourceService } from './patient-resource.service';

describe('PatientResourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientResourceService]
    });
  });

  it('should be created', inject([PatientResourceService], (service: PatientResourceService) => {
    expect(service).toBeTruthy();
  }));
});
