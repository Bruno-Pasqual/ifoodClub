import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Produto } from '../../../models/Produto';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() produto!: Produto;
  @ViewChild('modal') modal!: ModalComponent;

  constructor(private supabase: SupabaseService) {}

  openModal() {
    this.modal.showModal();
  }

  handleConfirm(produto: Produto, estadoProduto: boolean) {
    this.supabase.setDisponibilidadeProduto(produto, estadoProduto);
    this.modal.closeModal();
  }

  handleCancel() {
    console.log('Cancelled!');
  }
}
