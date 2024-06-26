import { AuthService } from './../../../services/auth.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { SupabaseService } from '../../../services/supabase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../../models/Employee';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDetails } from '../../../models/EmployeeDetails';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements AfterViewInit {
  @ViewChild('modal') modal!: ModalComponent;
  @ViewChild('modal2') modal2!: ModalComponent;
  firstTime: boolean = true;
  numberOfEmployee: number = 0;
  arrayEmployees: Employee[] = [];
  funcionarioForm: FormGroup;

  constructor(
    private supabase: SupabaseService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private auth: AuthService
  ) {
    this.funcionarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      enderecoImagem: ['', Validators.required],
    });
  }

  handleConfirm() {
    const user = this.auth.getCurrentUser();

    const newEmployee: EmployeeDetails = {
      nome_funcionario: this.funcionarioForm.value.nome,
      email: this.funcionarioForm.value.email,
      password: this.funcionarioForm.value.senha,
      image: this.funcionarioForm.value.enderecoImagem,
      id_funcionario: 999,
      id_usuario: 999,
      id_empresa: user.id_empresa,
    };

    this.supabase
      .fetchUserByEmail(this.funcionarioForm.value.email)
      .subscribe((res) => {
        if (res) {
          this.toast.error('O email informado já está em uso');
        } else {
          this.supabase.createEmployee(newEmployee).subscribe((res) => {
            this.updateEmployees();
            this.clearFields();
          });
        }
      });
  }

  ngAfterViewInit() {
    this.updateEmployees();
  }

  openModal1() {
    this.modal.showModal();
  }

  openModal2() {
    this.modal2.showModal();
  }

  closeModal() {
    this.firstTime = false;
  }

  updateEmployees(idEmpresa?: number) {
    const user = this.auth.getCurrentUser();

    this.supabase.getEmployees(user.id_empresa).subscribe((res) => {
      this.arrayEmployees = res;
    });
  }

  handleRemove(employee: Employee) {
    this.supabase.removeEmployeeByID(employee.id_usuario).subscribe((res) => {
      this.updateEmployees();
    });
  }

  clearFields() {
    this.funcionarioForm.reset();
  }
}
