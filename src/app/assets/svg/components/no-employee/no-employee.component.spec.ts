import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEmployeeComponent } from './no-employee.component';

describe('NoEmployeeComponent', () => {
  let component: NoEmployeeComponent;
  let fixture: ComponentFixture<NoEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
