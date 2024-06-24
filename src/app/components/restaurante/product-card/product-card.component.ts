import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Produto } from '../../../models/Produto';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() produto!: Produto;
  @ViewChild('modal') modal!: ModalComponent;

  openModal() {
    this.modal.showModal();
  }

  handleConfirm() {
    console.log('Confirmed!');
  }

  handleCancel() {
    console.log('Cancelled!');
  }
}
