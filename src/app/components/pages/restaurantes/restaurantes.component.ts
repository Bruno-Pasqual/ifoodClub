import { CurrentUser } from './../../../models/CurrentUser';
import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { UserDetails } from '../../../models/UserDetails';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
})
export class RestaurantesComponent implements OnInit {
  arrayRestaurantes: any[] = [];
  currentUser!: any; // Inicializa como null ou undefined

  constructor(private auth: AuthService, private supabase: SupabaseService) {
    this.currentUser = this.auth.getCurrentUser();
    console.log(this.currentUser);
  }

  async ngOnInit() {
    if (this.currentUser) {
      const data = await this.supabase.getAllRestaurants();
      this.arrayRestaurantes = data || [];
    }
  }

  async updateSelectedRestaurant(restaurantID: number) {
    if (this.currentUser.tipo_usuario != 'empresa') return;

    if (this.currentUser.id_empresa != undefined) {
      const data = await this.supabase.atualizarRestauranteSelecionado(
        this.currentUser.id_empresa,
        restaurantID
      );
      console.log(data);
    } else {
      console.error('ID da empresa não definido.');
    }
  }
}
