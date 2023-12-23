import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDaysOverviewComponent } from './sales-days-overview.component';

describe('SalesDaysOverviewComponent', () => {
  let component: SalesDaysOverviewComponent;
  let fixture: ComponentFixture<SalesDaysOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesDaysOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesDaysOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
