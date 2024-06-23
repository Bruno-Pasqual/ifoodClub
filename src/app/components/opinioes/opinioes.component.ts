import { Component, OnInit, HostListener } from '@angular/core';
interface IOpiniao {
  imagem: string;
  texto: string;
  nome: string;
}

@Component({
  selector: 'app-opinioes',
  templateUrl: './opinioes.component.html',
  styleUrl: './opinioes.component.css',
  host: {
    '[style.--index]': 'currentIndex'
  }
})



export class OpinioesComponent implements OnInit{
  
  opinioes: IOpiniao[] = [
    {
      imagem: '../../../assets/imgs/foto-empresa.svg',
      texto: 'Descobrimos na Plataforma FoodClub a solução perfeita para alimentação dos nossos colaboradores. Eficiência e variedade que superam expectativas!',
      nome: 'InovaTech'
    },
    {
      imagem: '../../../assets/imgs/foto-empresa.svg',
      texto: 'A Plataforma FoodClub revolucionou o nosso almoço corporativo. Agilidade e qualidade que se traduzem em maior produtividade e satisfação.',
      nome: 'EcoEnergia Renovável '
    },
    {
      imagem: '../../../assets/imgs/foto-empresa.svg',
      texto: 'A Plataforma FoodClub entende de negócios e de paladar. A combinação de praticidade com sabor é o que toda empresa precisa.',
      nome: 'ModaCorp Vestuário'
    },
    {
      imagem: '../../../assets/imgs/foto-empresa.svg',
      texto: 'Com a Plataforma FoodClub, cada refeição é uma experiência única. A pontualidade e a diversidade do serviço nos impressionam a cada entrega.',
      nome: 'ConstruBem Engenharia'
    },
    {
      imagem: '../../../assets/imgs/foto-empresa.svg',
      texto: 'A Plataforma FoodClub nos oferece uma variedade incrível de opções para as refeições dos nossos criativos. Conforto e sabor que inspiram!',
      nome: 'ArteViva Decorações'
    },
    {
      imagem: '../../../assets/imgs/foto-empresa.svg',
      texto: 'Com a Plataforma FoodClub, temos acesso a refeições saudáveis que acompanham a filosofia da nossa empresa. Qualidade e bem-estar em cada prato!',
      nome: 'BioSaúde'
    },
    // ...
  ];

  currentIndex = 0;
  initialX: number = 0;
  initialIndex: number = 0;
  dragging = false;

  constructor() {}

  ngOnInit(): void {}

  onDragStart(event: TouchEvent | MouseEvent): void {
    this.dragging = true;
    this.initialX = this.getEventX(event);
    this.initialIndex = this.currentIndex;
  }

  onDragMove(event: TouchEvent | MouseEvent): void {
    if (!this.dragging) return;
    
    const currentX = this.getEventX(event);
    const deltaX = currentX - this.initialX;

    if (deltaX > 50 && this.currentIndex > 0) {
      this.currentIndex = this.initialIndex - 1;
      this.dragging = false;
    } else if (deltaX < -50 && this.currentIndex < this.opinioes.length - 1) {
      this.currentIndex = this.initialIndex + 1;
      this.dragging = false;
    }
  }

  onDragEnd(event: TouchEvent | MouseEvent): void {
    this.dragging = false;
  }

  getEventX(event: TouchEvent | MouseEvent): number {
    if (event instanceof TouchEvent) {
      return event.touches[0].clientX;
    } else {
      return event.clientX;
    }
  }
}
