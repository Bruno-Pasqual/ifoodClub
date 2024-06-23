import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComofuncionaComponent } from './card-comofunciona.component';

describe('CardComofuncionaComponent', () => {
  let component: CardComofuncionaComponent;
  let fixture: ComponentFixture<CardComofuncionaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComofuncionaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardComofuncionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
