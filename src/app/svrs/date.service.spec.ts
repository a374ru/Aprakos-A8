import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';
// import { SedService } from './sed.service';
import { HttpClientModule } from '@angular/common/http';

describe('DateService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    providers: [DateService],
    imports:[HttpClientModule]

  }));

  it('should be created', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service).toBeTruthy();
  });
});
