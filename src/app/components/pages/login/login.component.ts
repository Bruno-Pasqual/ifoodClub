import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {
    // this.checkInputs();
    this.supaService.fetchUsuarios().subscribe((res) => {
      // console.log(res);
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // this.checkInputs()
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.checkInputs(email, password);
    } else {
      this.toaster.error(
        'Email ou senha estão incorretos',
        'Falha ao realizar login'
      );
    }
  }

  checkInputs(email: string, password: string): void {
    this.supaService.confirmLoggin(email, password).subscribe((res) => {
      const logginAllowed: boolean = res;

      if (logginAllowed) {
        this.router.navigateByUrl('inicio');
      }
    });
  }
}
