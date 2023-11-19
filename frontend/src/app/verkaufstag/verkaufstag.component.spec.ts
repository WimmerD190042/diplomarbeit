import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerkaufstagComponent } from './verkaufstag.component';

describe('VerkaufstagComponent', () => {
  let component: VerkaufstagComponent;
  let fixture: ComponentFixture<VerkaufstagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerkaufstagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerkaufstagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
