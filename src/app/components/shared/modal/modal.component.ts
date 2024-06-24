import {
  Component,
  EventEmitter,
  Output,
  HostListener,
  input,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  isVisible: boolean = false;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Input()
  titulo!: string;

  showModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
    this.closeModal();
  }

  onOverlayClick(event: MouseEvent) {
    this.closeModal();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    this.closeModal();
  }
}
