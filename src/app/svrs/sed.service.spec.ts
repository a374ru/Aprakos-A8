import { TestBed } from '@angular/core/testing';
import { SedService } from './sed.service';
import { HttpClientModule } from '@angular/common/http';


describe('SedService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    imports: [HttpClientModule],
    providers: [SedService]


  }));

  it('SED SERVICE', () => {
    const service: SedService = TestBed.get(SedService);
    expect(service).toBeTruthy();
    
  });


});
