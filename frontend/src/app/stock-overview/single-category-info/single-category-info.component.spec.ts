import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCategoryInfoComponent } from './single-category-info.component';

describe('SingleCategoryInfoComponent', () => {
  let component: SingleCategoryInfoComponent;
  let fixture: ComponentFixture<SingleCategoryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCategoryInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleCategoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
