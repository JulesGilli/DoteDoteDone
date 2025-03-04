import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent {
  @Input() ticket: any;
  @Output() close = new EventEmitter<void>();
  @Output() valid = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  validModal() {
    this.valid.emit();
  }
}
