import { CurrentUser } from './../../../models/CurrentUser';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  currentPage: string = 'inicio';
  tipoUsuario: string = '';
  currentUser: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private stateService: StateService
  ) {
    this.currentUser = this.auth.getCurrentUser();
    console.log(this.currentUser);
  }

  ngOnInit(): void {
    this.stateService.currentPage$.subscribe((pagina) => {
      this.currentPage = pagina;
      this.tipoUsuario = this.auth.getCurrentUser().tipo_usuario;
    });
  }

  handleLogout(): void {
    this.auth.logout();
    this.router.navigateByUrl('login');
  }

  handleLinkClick(paginaDesejada: string): void {
    this.stateService.setCurrentPage(paginaDesejada);
  }
}
