import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSalesDayComponent } from './create-sales-day.component';

describe('CreateSalesDayComponent', () => {
  let component: CreateSalesDayComponent;
  let fixture: ComponentFixture<CreateSalesDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSalesDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSalesDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
