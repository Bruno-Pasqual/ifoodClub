import { Component } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {
  orderCode: number = 10;
  companyName: string = 'Veolia';
  orderDate: string = this.generateDate();

  generateDate() {
    // Obtém a data atual
    const horaPedido: Date = new Date();

    // Formatação da data
    const formattedDate: string = `${horaPedido.getDate()} ${horaPedido.toLocaleString(
      'default',
      { month: 'short' }
    )} - ${horaPedido.getHours().toString().padStart(2, '0')}:${horaPedido
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    return formattedDate;
  }
}
