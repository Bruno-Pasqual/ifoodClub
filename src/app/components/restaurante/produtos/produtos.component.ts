import { SupabaseService } from './../../../services/supabase.service';
import { Component, ViewChild, Input } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Produto } from '../../../models/Produto';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export default class ProdutosComponent {
  @ViewChild('modal') modal!: ModalComponent;
  arrayProdutos: Produto[] = [];

  constructor(private supabase: SupabaseService, private auth: AuthService) {}

  openModal() {
    this.modal.showModal();
  }

  ngOnInit() {
    this.supabase.getProductsFromRestaurante().subscribe((res) => {
      if (res != null) this.arrayProdutos = res;
    });
  }

  handleConfirm() {
    console.log('Confirmed!');
  }

  handleCancel() {
    console.log('Cancelled!');
  }
}
