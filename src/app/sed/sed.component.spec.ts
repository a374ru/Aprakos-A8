import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SedComponent } from './sed.component';
import { HttpClientModule } from '@angular/common/http';

describe('SedComponent', () => {
  let component: SedComponent;
  let fixture: ComponentFixture<SedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SedComponent],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ПРОВЕРКА ', () => {
    expect(component).toBeTruthy();
  });
});
