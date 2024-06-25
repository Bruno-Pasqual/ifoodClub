import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
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
    private Auth: AuthService,
    private toastr: ToastrService // Corrigido: Injetar o ToastrService aqui
  ) {
    this.loginForm = this.fb.group({
      email: ['donaJoana@gmail.com', [Validators.required, Validators.email]],
      password: ['joana123', [Validators.required, Validators.minLength(5)]],
    });
  }

  async ngOnInit() {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.supaService.checkLogin(email, password);
    } else {
      this.toastr.error(
        'Email ou senha estão incorretos',
        'Falha ao realizar login'
      );
    }
  }
}
