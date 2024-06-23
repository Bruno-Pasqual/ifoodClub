import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loggedInKey = 'loggedIn';

  constructor() {}

  // Método para fazer login
  login(): void {
    sessionStorage.setItem(this.loggedInKey, 'true');
  }

  // Método para fazer logout
  logout(): void {
    sessionStorage.removeItem(this.loggedInKey);
  }

  // Método para verificar se o usuário está logado
  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.loggedInKey) === 'true';
  }

  saveCurrentUser(): void {}
}
