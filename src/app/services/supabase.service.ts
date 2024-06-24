import { CurrentUser } from './../models/CurrentUser';
import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/Usuario';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDetails } from '../models/UserDetails';
import { Produto } from '../models/Produto';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://krjrlepfeiwkiydkjypo.supabase.co';
  private supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyanJsZXBmZWl3a2l5ZGtqeXBvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTMyMjE1MiwiZXhwIjoyMDI2ODk4MTUyfQ.dHHr5RQ7nyKdeyNFSssFZWkV0EqzesUAjqRK0AZC-7I';
  public supabase: SupabaseClient;
  toaster = inject(ToastrService);
  //
  constructor(private auth: AuthService, private router: Router) {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  //#region "Produtos"

  getProductsFromRestaurante(): Observable<Produto[] | null> {
    const currentUser: CurrentUser | null = this.auth.getCurrentUser();
    if (!currentUser) {
      // Handle the case where currentUser is null or undefined
      this.toaster.error('Usuário não autenticado', 'Erro de usuário');
    }

    const { id_restaurante } = currentUser;

    return from(
      this.supabase
        .from('tproduto')
        .select('*')
        .eq('id_restaurante', id_restaurante)
        .then((res) => res.data)
    );
  }

  //#endregion

  //#region "User Methods"

  fetchUsuarios(): Observable<User[]> {
    //Lista todos os usuários
    return from(
      this.supabase
        .from('tusuario')
        .select('*')
        .then(({ data }) => data as User[])
    );
  }

  getUserDetails(user: User): Observable<any> {
    const ut = user.tipo_usuario;

    return from(
      this.supabase
        .from(`t${ut}`)
        .select('*')
        .eq('id_usuario', user.id_usuario)
        .single()
    );
  }

  fetchUserByEmail(email: string): Observable<any> {
    //Busca um usuário utilizando o email como parâmetro
    return from(
      this.supabase
        .from('tusuario')
        .select('*')
        .eq('email_usuario', email)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching user by email:', error);
            return null;
          }
          return data;
        })
    );
  }

  createUser(
    //Cria um novo usuário base
    email: string,
    senhaUsuario: string,
    tipoUsuario: string
  ): Observable<any> {
    const createUserPromise = this.supabase
      .from('tusuario')
      .insert([
        {
          email_usuario: email,
          tipo_usuario: tipoUsuario,
          senha_usuario: senhaUsuario,
        },
      ])
      .select();

    return from(createUserPromise).pipe(
      map(({ data, error }) => {
        if (error) {
          console.error('Error creating user:', error);
          throw new Error(error.message);
        }
        return data;
      })
    );
  }

  checkLogin(email: string, senhaUsuario: string): void {
    let user: any = {};
    let userDetails: any = {};

    this.fetchUserByEmail(email).subscribe((res) => {
      if (res != null) {
        if (res.senha_usuario == senhaUsuario) {
          user = { ...res };
          // this.auth.login(res);
          this.getUserDetails(user).subscribe(({ data, error }) => {
            if (!error) {
              userDetails = { ...data };
              this.auth.saveCurrentUser(user, userDetails);

              return;
            } else {
              this.toaster.error(
                'Não foi encontrado um cadastro com o usuário correspondente',
                'Erro de login'
              );
            }
          });
        } else {
          this.toaster.error(
            'Os campos informados estão incorretos',
            'Erro de login'
          );
        }
      } else {
        this.toaster.error(
          'Os campos informados estão incorretos',
          'Erro de login'
        );
      }
    });
  }
  //#endregion

  //#region Empresa

  createCompany(
    //Cria um novo usuário especializado
    nome: string,
    cnpj: string,
    cep: string,
    numero: number,
    idUsuario: number,
    imageAddress: string,
    typeCompany: string
  ): Observable<any> {
    const createUserPromise = this.supabase
      .from(`${typeCompany == 'empresa' ? 'tempresa' : 'trestaurante'}`)
      .insert([
        {
          nome: nome,
          cnpj: cnpj,
          cep: cep,
          numero: numero,
          id_usuario: idUsuario,
          image: imageAddress,
        },
      ])
      .select();

    return from(createUserPromise).pipe(
      map(({ data, error }) => {
        if (error) {
          console.error('Error creating company:', error);
          throw new Error(error.message);
        }
        return data;
      })
    );
  }
}
