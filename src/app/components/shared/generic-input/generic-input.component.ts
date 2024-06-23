import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.css'],
})
export class GenericInputComponent {
  @Input() labelText: string = 'Título da label';
  @Input() placeholderText: string = 'Digite a sua entrada';
  @Input() typeOfInput: string = 'text';
  @Input() formControlName: string = '';
}
