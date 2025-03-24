import {Component, inject} from '@angular/core';
import {SharedModule} from '../../../shared.module';
import {animate, style, transition, trigger} from '@angular/animations';
import {GetDataService} from '../../services/data/get/get-data.service';

@Component({
  selector: 'app-loading',
  imports: [SharedModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LoadingComponent {
  public readonly _getDataService = inject(GetDataService);
}
