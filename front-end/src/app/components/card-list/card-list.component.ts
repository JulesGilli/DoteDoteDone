import { Component, Input } from '@angular/core';
import { Card } from '../../models';
import {SharedModule} from '../../../shared.module';

@Component({
  selector: 'app-card-list',
  imports: [SharedModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  @Input() card!: Card;
}
