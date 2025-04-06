import { Component, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-rename-modal',
  templateUrl: './rename-modal.component.html',
  styleUrls: ['./rename-modal.component.scss'],
  standalone: true,
  imports: [
    FormsModule
  ]
})
export class RenameModalComponent implements OnChanges {
  @Input() newName = '';
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newName'] && changes['newName'].currentValue !== undefined) {
      this.newName = changes['newName'].currentValue;
    }
  }


  confirm() {
    this.save.emit(this.newName.trim());
  }

  close() {
    this.cancel.emit();
  }
}
