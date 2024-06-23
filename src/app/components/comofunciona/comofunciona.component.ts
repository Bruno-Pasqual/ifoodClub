import { Component } from '@angular/core';

@Component({
  selector: 'app-comofunciona',
  templateUrl: './comofunciona.component.html',
  styleUrl: './comofunciona.component.css',
})
export class ComofuncionaComponent {
  cards = [
    { imagem: '../../../assets/icons/icon1.svg', 
      texto: `Nosso papel é simplificar a alimentação corporativa para empresas de todos os tamanhos.
      Oferecemos uma plataforma intuitiva onde empresas podem selecionar refeições deliciosas de uma variedade de restaurantes locais, garantindo que seus funcionários tenham opções saborosas e saudáveis todos os dias.` },

    { imagem: '../../../assets/icons/icon2.svg', 
      texto: `Junte-se a nós para expandir seu alcance e aumentar sua base de clientes! Ao se cadastrar em nossa plataforma, seu restaurante terá a oportunidade de fornecer refeições saborosas para empresas locais, alcançando um novo público e aumentando suas vendas. Aumente sua visibilidade e torne-se a escolha preferida para alimentação corporativa na região.` },

    { imagem: '../../../assets/icons/icon3.svg', 
      texto: `Somos o elo entre empresas que buscam fornecer refeições para seus funcionários e restaurantes que desejam expandir seus negócios. Nossa plataforma oferece uma interface eficiente para que empresas escolham entre uma variedade de opções de cardápio de restaurantes locais, garantindo uma experiência gastronômica de qualidade para seus funcionários, enquanto os restaurantes aumentam suas vendas e visibilidade.` },

    { imagem: '../../../assets/icons/icon4.svg', 
      texto: `Contamos com uma rede de transporte confiável e eficiente para entregar as refeições diretamente do restaurante até a empresa. Com parceiros como Uber Flash, 99 Entrega, e uma equipe de motoboys e carros próprios, garantimos que as refeições cheguem frescas e pontualmente, proporcionando uma experiência de entrega impecável para nossos clientes.` },
    // adicione mais cards aqui
  ];
}
