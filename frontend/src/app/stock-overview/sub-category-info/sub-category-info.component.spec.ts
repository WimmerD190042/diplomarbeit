import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryInfoComponent } from './sub-category-info.component';

describe('SubCategoryInfoComponent', () => {
  let component: SubCategoryInfoComponent;
  let fixture: ComponentFixture<SubCategoryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCategoryInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubCategoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
