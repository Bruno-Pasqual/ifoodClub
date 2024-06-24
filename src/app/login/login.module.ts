import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../components/pages/login/login.component';
import { CadastroComponent } from '../components/pages/cadastro/cadastro.component';
import { HomeComponent } from '../components/pages/home/home.component';
import { HeaderComponent } from '../components/header/header.component';
import { RouterModule } from '@angular/router';
import { GenericInputComponent } from '../components/shared/generic-input/generic-input.component';
import { ComofuncionaComponent } from '../components/comofunciona/comofunciona.component';
import { CardComofuncionaComponent } from '../components/card-comofunciona/card-comofunciona.component';
import { OpinioesComponent } from '../components/opinioes/opinioes.component';
import { FooterComponent } from '../components/footer/footer.component';

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    HeaderComponent,
    ComofuncionaComponent,
    CardComofuncionaComponent,
    OpinioesComponent,
    FooterComponent,
    GenericInputComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [HeaderComponent],
})
export class LoginModule {}
