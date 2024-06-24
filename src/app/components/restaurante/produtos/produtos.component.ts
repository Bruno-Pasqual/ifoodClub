import { Component, ViewChild, inject } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Produto } from '../../../models/Produto';
import { AuthService } from '../../../services/auth.service';
import { SupabaseService } from '../../../services/supabase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from '../../../services/produto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export default class ProdutosComponent {
  @ViewChild('modal') modal!: ModalComponent;
  arrayProdutos: Produto[] = [];
  quantidadeProdutosHabilitados: number = 0;
  cadastroForm: FormGroup;
  toaster = inject(ToastrService);

  constructor(
    private supabase: SupabaseService,
    private auth: AuthService,
    private fb: FormBuilder,
    private ps: ProdutoService
  ) {
    this.cadastroForm = this.fb.group({
      nomeProduto: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      enderecoImagem: ['', Validators.required],
    });
  }

  openModal() {
    this.modal.showModal();
  }

  ngOnInit() {
    this.atualizaProdutos();
  }

  atualizaProdutos() {
    this.supabase.getProductsFromRestaurante().subscribe((res) => {
      if (res != null) {
        this.arrayProdutos = res;
        this.quantidadeProdutosHabilitados =
          this.ps.getQuantidadeProdutosValidos(this.arrayProdutos);
      }
    });
  }

  handleConfirm() {
    console.log('Confirmed!');
  }

  handleCancel() {
    console.log('Cancelled!');
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      console.log('Formulário válido', this.cadastroForm.value);

      const { nomeProduto, descricao, preco, enderecoImagem } =
        this.cadastroForm.value;

      const user = this.auth.getCurrentUser();

      const newProduto: Produto = {
        id: 999, // Você deve garantir que este ID seja gerado corretamente
        nome: nomeProduto,
        descricao,
        preco,
        image: enderecoImagem,
        id_restaurante: user.id_restaurante,
        habilitado: true,
      };

      this.supabase.createProduto(newProduto).subscribe({
        next: (data) => {
          console.log('Produto criado com sucesso:', data);
          this.modal.closeModal();
          this.atualizaProdutos();
        },
        error: (err) => {
          console.error('Erro ao criar produto:', err);
        },
      });
    }
  }
}
