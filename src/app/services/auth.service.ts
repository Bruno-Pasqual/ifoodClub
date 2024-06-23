import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loggedInKey = 'loggedIn';

  constructor() {}

  // Método para fazer login
  login(): void {
    localStorage.setItem(this.loggedInKey, 'true');
  }

  // Método para fazer logout
  logout(): void {
    localStorage.removeItem(this.loggedInKey);
  }

  // Método para verificar se o usuário está logado
  isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInKey) === 'true';
  }

  saveCurrentUser(): void {
    // Método placeholder, você pode adicionar a lógica necessária aqui.
  }
}
