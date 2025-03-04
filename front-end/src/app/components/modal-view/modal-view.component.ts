import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent {
  @Input() ticket: any;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  editModal() {
    this.edit.emit();
  }
}
