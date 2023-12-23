import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDayInfoComponent } from './sales-day-info.component';

describe('SalesDayInfoComponent', () => {
  let component: SalesDayInfoComponent;
  let fixture: ComponentFixture<SalesDayInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesDayInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesDayInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
