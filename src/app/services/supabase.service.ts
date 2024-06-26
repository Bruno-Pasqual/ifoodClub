import { CurrentUser } from './../models/CurrentUser';
import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/Usuario';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../models/Produto';
import { EmployeeDetails } from '../models/EmployeeDetails';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  //
  from(arg0: string) {
    throw new Error('Method not implemented.');
  }
  //#region "supa config"
  private supabaseUrl = 'https://krjrlepfeiwkiydkjypo.supabase.co';
  private supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyanJsZXBmZWl3a2l5ZGtqeXBvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTMyMjE1MiwiZXhwIjoyMDI2ODk4MTUyfQ.dHHr5RQ7nyKdeyNFSssFZWkV0EqzesUAjqRK0AZC-7I';
  public supabase: SupabaseClient;
  //#endregion

  toaster = inject(ToastrService);
  //
  constructor(private auth: AuthService, private router: Router) {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  //#region Restaurant

  async getAllRestaurants(): Promise<any[]> {
    let { data, error } = await this.supabase.from('trestaurante').select('*');

    if (error) {
      console.error('Error fetching restaurants:', error);
      return []; // Retorna um array vazio em caso de erro
    }

    return data || []; // Garante que data nunca será null
  }

  //#endregion

  //#region "Funcionários"

  createEmployee(employee: EmployeeDetails): Observable<any> {
    // Aqui nessa primeira parte é realizada o cadastro do usuário, o qual nos retornará seu ID que será utilizado para criar o funcionário em seguida
    return from(
      this.supabase
        .from('tusuario')
        .insert({
          tipo_usuario: 'funcionario',
          senha_usuario: employee.password,
          email_usuario: employee.email,
        })
        .select()
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          this.toaster.error('Erro ao cadastrar o usuário');
          console.error('Error creating user:', error);
          throw new Error(error.message);
        }

        const idUsuario = data[0]?.id_usuario;

        return from(
          this.supabase
            .from('tfuncionario')
            .insert({
              nome_funcionario: employee.nome_funcionario,
              image: employee.image,
              id_usuario: idUsuario, // Passa o id_usuario gerado para o cadastro do funcionário
              id_empresa: employee.id_empresa,
            })
            .select()
        );
      }),
      map(({ data, error }) => {
        if (error) {
          this.toaster.error('Erro ao cadastrar o funcionário');
          console.error('Error creating employee:', error);
          throw new Error(error.message);
        }

        this.toaster.success(
          'O funcionário foi criado com sucesso.',
          'Cadastro realizado'
        );
        return data;
      })
    );
  }

  getEmployees(empresaId: number) {
    const createUserPromise = this.supabase
      .from('tfuncionario')
      .select('*')
      .eq('id_empresa', empresaId);

    return from(createUserPromise).pipe(
      map(({ data, error }) => {
        if (error) {
          this.toaster.error('Alguma coisa deu errado');

          console.error('Error fetching employees:', error);
          throw new Error(error.message);
        }
        return data;
      })
    );
  }
  removeEmployeeByID(id: number): Observable<any> {
    return this.getUserByID(id).pipe(
      switchMap((res) => {
        if (res.length === 0) {
          this.toaster.error('O usuário não foi encontrado');
          return of(null); // Retorna um Observable vazio
        } else {
          return from(
            this.supabase.from('tusuario').delete().eq('id_usuario', id)
          ).pipe(
            tap(({ data, error }) => {
              if (error) {
                console.error('Error deleting user:', error);
                this.toaster.error('Erro ao remover o usuário');
                return;
              }
              this.toaster.success('O usuário foi removido com sucesso');
            }),
            catchError((err) => {
              console.error('Error in deletion observable:', err);
              this.toaster.error('Erro ao remover o usuário');
              return of(null); // Retorna um Observable vazio em caso de erro
            })
          );
        }
      })
    );
  }

  // removeEmployee(id: number) {
  //   return from(
  //     this.supabase
  //       .from('tusuario')
  //       .select('*')
  //       .eq('id_usuario', id)
  //       .then(({ data }) => data as User[])
  //   );
  // }

  //#endregion

  //#region "Produtos"

  //

  async getPratosByID(idRestaurant: number) {
    let { data, error } = await this.supabase
      .from('tproduto')
      .select('*')
      .eq('id_restaurante', idRestaurant);

    if (error) {
      this.toaster.error('erro ao buscar pratos');
    }
    return data;
  }

  createProduto(produto: Produto): Observable<any> {
    const createUserPromise = this.supabase
      .from(`tproduto`)
      .insert([
        {
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco,
          id_restaurante: produto.id_restaurante,
          image: produto.image,
          habilitado: true,
        },
      ])
      .select();

    return from(createUserPromise).pipe(
      map(({ data, error }) => {
        if (error) {
          this.toaster.error('Alguma coisa deu errado');

          console.error('Error creating company:', error);
          throw new Error(error.message);
        }
        this.toaster.success('O produto foi criado');
        return data;
      })
    );
  }

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

  async setDisponibilidadeProduto(
    produto: Produto,
    estadoProduto: boolean
  ): Promise<any> {
    const { data, error } = await this.supabase
      .from('tproduto')
      .update({ habilitado: estadoProduto })
      .eq('id', produto.id)
      .select();

    if (error) {
      this.toaster.error(
        'Ocorreu um erro ao atualizar a disponibilidade do produto'
      );
    } else {
      const acao = estadoProduto ? 'habilitado' : 'desabilitado';
      this.toaster.success(`O produto foi ${acao} com sucesso`);
    }
  }

  //#endregion

  //#region "User Methods"

  getUserByID(id: number) {
    return from(
      this.supabase
        .from('tusuario')
        .select('*')
        .eq('id_usuario', id)
        .then(({ data }) => data as User[])
    );
  }

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
    // Busca um usuário utilizando o email como parâmetro
    return from(
      this.supabase
        .from('tusuario')
        .select('*')
        .eq('email_usuario', email)
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching user by email:', error);
            return null;
          }
          if (data.length !== 1) {
            console.error('Expected a single result, but found:', data.length);
            return null;
          }
          return data[0];
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

  async atualizarRestauranteSelecionado(
    idEmpresa: number,
    idRestaurante: number
  ): Promise<void> {
    try {
      console.log('empresa', idEmpresa);
      console.log('restaurante', idRestaurante);

      const { data, error } = await this.supabase
        .from('tempresa')
        .update({ restaurante_selecionado: idRestaurante })
        .eq('id_empresa', idEmpresa)
        .select();

      if (error) {
        throw new Error(`Erro ao atualizar tempresa: ${error.message}`);
      }

      this.toaster.success('O restaurante selecionado foi atualizado');
    } catch (error) {
      console.error('Erro na operação de atualização:');
      throw error;
    }
  }

  //#region "Empresa"

  async getAllCompanies() {
    let { data, error } = await this.supabase.from('tempresa').select('*');

    if (error) {
      this.toaster.error('Algo deu errado ao buscar a empresa');
      return null;
    }
    return data;
  }

  async getCompanyById(idEmpresa: number) {
    let { data, error } = await this.supabase
      .from('tempresa')
      .select('*')
      .eq('id_empresa', idEmpresa);

    if (error) {
      this.toaster.error('algo deu errado ao buscar a empresa');
      return null;
    }
    return data;
  }

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
//#endregion
