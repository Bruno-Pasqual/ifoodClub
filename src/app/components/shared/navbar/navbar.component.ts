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

  constructor(
    private auth: AuthService,
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.stateService.currentPage$.subscribe((pagina) => {
      this.currentPage = pagina;
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
