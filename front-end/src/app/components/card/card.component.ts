import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() titre!: string;
  @Input() statusCard!: string;
  @Input() ticketId!: string;
  @Input() manager!: string;
  @Output() cardClick = new EventEmitter<void>();

  onTitleClick(event: Event) {
    event.stopPropagation();
    this.cardClick.emit();
  }
}
