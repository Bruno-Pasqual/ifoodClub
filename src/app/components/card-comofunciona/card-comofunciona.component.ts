import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-comofunciona',
  templateUrl: './card-comofunciona.component.html',
  styleUrl: './card-comofunciona.component.css',
})
export class CardComofuncionaComponent {
  @Input() imagem: string ="";
  @Input() texto: string = "";
}
