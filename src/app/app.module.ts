import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { LoginModule } from './login/login.module';
import { PaginaInicialComponent } from './components/pages/pagina-inicial/pagina-inicial.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, PaginaInicialComponent, PaginaInicialComponent, NavbarComponent, PaginaInicialComponent],
  imports: [BrowserModule, AppRoutingModule, LoginModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
