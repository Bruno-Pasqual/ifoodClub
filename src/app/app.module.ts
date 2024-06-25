import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { LoginModule } from './login/login.module';
import { PaginaInicialComponent } from './components/pages/pagina-inicial/pagina-inicial.component';
import { ToastrModule } from 'ngx-toastr';
import { PedidosComponent } from './components/restaurante/pedidos/pedidos.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import ProdutosComponent from './components/restaurante/produtos/produtos.component';
import { ProductCardComponent } from './components/restaurante/product-card/product-card.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './components/pages/employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    PaginaInicialComponent,
    NavbarComponent,
    PaginaInicialComponent,
    PedidosComponent,
    ProdutosComponent,
    ProductCardComponent,
    ModalComponent,
    EmployeeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,

    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
