import { Injectable } from '@angular/core';
import { Produto } from '../models/Produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor() {}

  getQuantidadeProdutosValidos(arrayProdutos: Produto[]): number {
    return arrayProdutos.reduce((contador, produto) => {
      return produto.habilitado ? contador + 1 : contador;
    }, 0);
  }
}
