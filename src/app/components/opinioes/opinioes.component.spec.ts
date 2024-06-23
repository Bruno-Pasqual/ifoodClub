import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinioesComponent } from './opinioes.component';

describe('OpinioesComponent', () => {
  let component: OpinioesComponent;
  let fixture: ComponentFixture<OpinioesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpinioesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpinioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
