import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerkaufstagKundeComponent } from './verkaufstag-kunde.component';

describe('VerkaufstagKundeComponent', () => {
  let component: VerkaufstagKundeComponent;
  let fixture: ComponentFixture<VerkaufstagKundeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerkaufstagKundeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerkaufstagKundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
