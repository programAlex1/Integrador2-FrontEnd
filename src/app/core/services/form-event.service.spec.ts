import { TestBed } from '@angular/core/testing';

import { FormEventService } from '../../core/services/form-event.service';

describe('FormEventService', () => {
  let service: FormEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
