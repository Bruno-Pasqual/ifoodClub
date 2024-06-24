import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  toaster = inject(ToastrService);

  constructor(
    private fb: FormBuilder,
    private supaService: SupabaseService,
    private router: Router,
    private Auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['donaJoana@gmail.com', [Validators.required, Validators.email]],
      password: ['joana123', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {
    this.Auth.isLoggedIn();
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário
    alert('entrei');

    // this.checkInputs()
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.supaService.checkLogin(email, password);
    } else {
      this.toaster.error(
        'Email ou senha estão incorretos',
        'Falha ao realizar login'
      );
    }
  }
}
