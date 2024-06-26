import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoFuncionarioComponent } from './pedido-funcionario.component';

describe('PedidoFuncionarioComponent', () => {
  let component: PedidoFuncionarioComponent;
  let fixture: ComponentFixture<PedidoFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedidoFuncionarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
