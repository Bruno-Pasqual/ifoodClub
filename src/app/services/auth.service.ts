import { Injectable, inject } from '@angular/core';
import { User } from '../models/Usuario';
import { UserDetails } from '../models/UserDetails';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrentUser } from '../models/CurrentUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loggedInKey = 'loggedIn';
  toaster = inject(ToastrService);

  constructor(private router: Router) {}

  login(): void {
    localStorage.setItem(this.loggedInKey, 'true');
    this.router.navigateByUrl('inicio');
    this.toaster.success('Loggin realizado com sucesso');
  }

  logout(): void {
    localStorage.removeItem(this.loggedInKey);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): void {
    const isLogged: boolean = localStorage.getItem(this.loggedInKey) === 'true';

    if (isLogged) {
      this.router.navigateByUrl('inicio');
      this.toaster.success('Bem vindo de volta');
    }
  }

  saveCurrentUser(user: User, userDetails: UserDetails): void {
    const currentUser = {
      ...user,
      ...userDetails,
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.login();
  }

  getCurrentUser(): CurrentUser {
    const currentUserString = localStorage.getItem('currentUser');
    return JSON.parse(currentUserString!) as CurrentUser;
  }
}
