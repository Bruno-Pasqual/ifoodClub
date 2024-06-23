import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://krjrlepfeiwkiydkjypo.supabase.co';
  private supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyanJsZXBmZWl3a2l5ZGtqeXBvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTMyMjE1MiwiZXhwIjoyMDI2ODk4MTUyfQ.dHHr5RQ7nyKdeyNFSssFZWkV0EqzesUAjqRK0AZC-7I';
  public supabase: SupabaseClient;
  //
  constructor() {
    console.log('SupabaseService is being initialized');
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    console.log('Supabase client created');
  }

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
    password: string,
    tipoUsuario: string
  ): Observable<any> {
    const createUserPromise = this.supabase
      .from('tusuario')
      .insert([
        {
          email_usuario: email,
          tipo_usuario: tipoUsuario,
          senha_usuario: password,
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

  confirmLoggin(email: string, password: string): Observable<boolean> {
    return this.fetchUserByEmail(email).pipe(
      map((res: any) => {
        if (res != null) {
          //todo - colocar criptografia de senha com o bycript ()
          return res.senha_usuario === password;
          //Salvar usuário
        }
        return false;
      })
    );
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
    console.log('tipo' + typeCompany);

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
