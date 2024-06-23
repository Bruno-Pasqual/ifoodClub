import { Component } from '@angular/core';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css',
})
export class PaginaInicialComponent {
  currentPage: string = 'inicio';

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.currentPage$.subscribe((pagina) => {
      this.currentPage = pagina;
    });
  }
}
