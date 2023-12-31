import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeilstuckeComponent } from './teilstucke.component';

describe('TeilstuckeComponent', () => {
  let component: TeilstuckeComponent;
  let fixture: ComponentFixture<TeilstuckeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeilstuckeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeilstuckeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
