import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  tipoCadastro: string = '';

  constructor(private fb: FormBuilder, private supaService: SupabaseService) {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      tipoUsuario: ['', [Validators.required]],
      // empresa
      nome: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      imagem: ['', [Validators.required]],
      // Restaurante
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const {
      email,
      password,
      confirmPassword,
      tipoUsuario,
      nome,
      cnpj,
      cep,
      numero,
      imagem,
    } = this.cadastroForm.value;

    if (this.cadastroForm.invalid || password != confirmPassword) {
      alert('Algo deu errado, verifique os campos e tente novamente');
    } else {
      this.supaService
        .createUser(email, password, tipoUsuario)
        .subscribe((res) => {
          const id_usuario: number = res[0].id_usuario;
          this.createCompany(
            nome,
            cnpj,
            cep,
            numero,
            id_usuario,
            imagem,
            tipoUsuario
          );
        });
    }
  }

  updateTipoCadastro(tipo: string): void {
    this.tipoCadastro = tipo;
  }

  createCompany(
    nome: string,
    cnpj: string,
    cep: string,
    numero: number,
    id_usuario: number,
    imagem: string,
    tipoUsuario: string
  ) {
    console.log(tipoUsuario);

    this.supaService
      .createCompany(nome, cnpj, cep, numero, id_usuario, imagem, tipoUsuario)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
