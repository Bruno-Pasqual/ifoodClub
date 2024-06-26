import { Component } from '@angular/core';
import { StateService } from '../../../services/state.service';
import { AuthService } from '../../../services/auth.service';
import { CurrentUser } from '../../../models/CurrentUser';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css',
})
export class PaginaInicialComponent {
  currentPage: string = 'inicio';
  tipoUsuario: string = '';
  currentUser: CurrentUser;
  selectedCompany: any;

  constructor(
    private stateService: StateService,
    private auth: AuthService,
    private supabase: SupabaseService
  ) {
    this.tipoUsuario = this.auth.getCurrentUser().tipo_usuario;
    this.currentPage = 'inicio';
    this.currentUser = this.auth.getCurrentUser();
    console.log(this.currentUser);
  }

  async ngOnInit(): Promise<void> {
    this.stateService.currentPage$.subscribe((pagina) => {
      this.currentPage = pagina;
    });
  }
}
