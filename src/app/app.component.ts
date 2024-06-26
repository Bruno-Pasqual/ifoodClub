import { Component } from '@angular/core';
import { SupabaseService } from './services/supabase.service';
import { EmployeeDetails } from './models/EmployeeDetails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';

  constructor(private supabase: SupabaseService) {}

  e1: EmployeeDetails = {
    id_funcionario: 999,
    id_empresa: 25,
    id_usuario: 66,
    nome_funcionario: 'Larissa Maiara',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'teste@gmail.com',
    password: '123456',
  };

  ngOnInit() {
    // this.supabase.createEmployee(this.e1).subscribe((res) => {
    //   console.log(res);
    // });
    // this.supabase.deleteEmployeeByEmail('joana@gmail.com').subscribe((res) => {
    //   console.log(res);
    // });
    // this.supabase.getUserByID(70).subscribe((res) => {
    // });
    // this.supabase.removeEmployeeByID(70);
  }
}
