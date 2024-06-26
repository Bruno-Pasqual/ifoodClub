import { Component } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { CurrentUser } from '../../../models/CurrentUser';
import { AuthService } from '../../../services/auth.service';
import { Produto } from '../../../models/Produto';

@Component({
  selector: 'app-pedido-funcionario',
  templateUrl: './pedido-funcionario.component.html',
  styleUrl: './pedido-funcionario.component.css',
})
export class PedidoFuncionarioComponent {
  currentUser: CurrentUser;
  selectedCompany: any;
  selectedRestaurantID: number;
  selectedRestaurant: any;
  restaurantMeals: any[] | null;

  getFormattedDate(): string {
    const months = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];

    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];

    return `${dayOfMonth} de ${month}`;
  }

  constructor(private supabase: SupabaseService, private auth: AuthService) {
    this.currentUser = this.auth.getCurrentUser();
    this.selectedRestaurantID = this.currentUser.id_empresa;
    this.selectedCompany = this.currentUser.id_empresa;
    this.restaurantMeals = [];
  }

  async ngOnInit() {
    //busco todas as empresas
    const data = await this.supabase.getAllCompanies();

    //Busco a empresa com o id que está no currentUser, para ter acesso ao restauranteSelecionado pela empresa, registrado no banco
    data?.map((company) => {
      if (company.id_empresa === this.selectedCompany) {
        this.selectedRestaurantID = company.restaurante_selecionado;
      }
    });

    //busco todos os restaurantes e filtro pelo que quero
    const restaurants = await this.supabase.getAllRestaurants();
    restaurants.map((res) => {
      if (res.id_restaurante === this.selectedRestaurantID)
        this.selectedRestaurant = res;
    });

    // Atualiza a propriedade com os dados do prato do restaurante que foi selecionado pela empresa do funcionários
    const pratos = await this.supabase.getPratosByID(this.selectedRestaurantID);
    this.restaurantMeals = pratos;

    console.log(this.restaurantMeals);
  }
}
