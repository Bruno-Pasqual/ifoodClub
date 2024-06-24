import { Component, ViewChild, Input } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Produto } from '../../../models/Produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export default class ProdutosComponent {
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
