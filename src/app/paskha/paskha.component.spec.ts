import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaskhaComponent } from './paskha.component';

describe('PaskhaComponent', () => {
  let component: PaskhaComponent;
  let fixture: ComponentFixture<PaskhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaskhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaskhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('тест переменной keyYear', () => {
  //   expect(component.keyYear).toBe();
  // });

  // it('проверка переменной paskhaCurrentYear', () => {
  //   expect(component.lastEaster).toBeTruthy();
  // });

  // it('проверка переменной paskhaCurrentYear', () => {
  //   expect(component.nextEaster).toBeTruthy();
  // });

  
});
