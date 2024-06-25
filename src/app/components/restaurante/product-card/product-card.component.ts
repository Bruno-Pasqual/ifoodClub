import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Produto } from '../../../models/Produto';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() produto!: Produto;
  @ViewChild('modal') modal!: ModalComponent;
  @Output() produtoExcluido = new EventEmitter<void>();

  constructor(private supabase: SupabaseService) {}

  openModal() {
    this.modal.showModal();
  }

  handleConfirm(produto: Produto, estadoProduto: boolean) {
    this.supabase
      .setDisponibilidadeProduto(produto, estadoProduto)
      .then(() => {
        this.produtoExcluido.emit();
        this.modal.closeModal();
      })
      .catch((error) => {
        console.error('Erro ao excluir produto:', error);
      });
  }

  handleCancel() {}
}
