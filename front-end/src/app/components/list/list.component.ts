import { Component } from '@angular/core';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'app-list',
  imports: [CardListComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {}
