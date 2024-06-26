import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  tipoCadastro: string = '';
  toaster = inject(ToastrService);

  constructor(
    private fb: FormBuilder,
    private supaService: SupabaseService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      // TODO: colocar criptografia de senha com bcrypt
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      tipoUsuario: ['', [Validators.required]],
      // empresa ou restaurante
      nome: ['', [Validators.required]],
      cnpj: [
        '',
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(18),
        ],
      ],
      cep: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(9)],
      ],
      numero: ['', [Validators.required]],
      imagem: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  onSubmit(event: Event): void {
    this.supaService
      .fetchUserByEmail(this.cadastroForm.value.email)
      .subscribe((res) => {
        if (res == null) {
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
            this.toaster.error(
              'Algo deu errado com os inputs, verifique-os e tente novamente',
              'Falha nos campos'
            );
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
        } else {
          this.toaster.error('O email informado já está em uso');
        }
      });
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
    //todo - colocar criptografia de senha com o bycript antes de salvar no banco

    this.supaService
      .createCompany(nome, cnpj, cep, numero, id_usuario, imagem, tipoUsuario)
      .subscribe((res) => {
        const stringToast: string = (tipoUsuario = 'restaurante'
          ? 'Restaurante cadastrado com sucessos'
          : 'A empresa foi cadastrada com sucesso');

        this.toaster.success(stringToast, 'Cadastrado realizado');
        this.router.navigateByUrl('/login');
      });
  }
}
