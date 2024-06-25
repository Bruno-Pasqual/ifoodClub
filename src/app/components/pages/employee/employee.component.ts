import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements AfterViewInit {
  @ViewChild('modal') modal!: ModalComponent;
  firstTime: boolean = true;

  ngAfterViewInit() {
    this.modal.showModal();
  }

  // Métodos para abrir e fechar o modal, se necessário no futuro
  openModal() {
    this.modal.showModal();
  }

  closeModal() {
    this.firstTime = false;
  }
}
