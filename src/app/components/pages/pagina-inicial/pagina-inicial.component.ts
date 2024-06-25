import { Component } from '@angular/core';
import { StateService } from '../../../services/state.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css',
})
export class PaginaInicialComponent {
  currentPage: string = 'inicio';
  tipoUsuario: string = '';

  constructor(private stateService: StateService, private auth: AuthService) {
    this.tipoUsuario = this.auth.getCurrentUser().tipo_usuario;
  }

  ngOnInit(): void {
    this.stateService.currentPage$.subscribe((pagina) => {
      this.currentPage = pagina;
    });
  }
}
