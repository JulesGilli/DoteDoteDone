import { inject, Injectable } from '@angular/core';
import { DeleteService } from '../../crud/delete/delete.service';
import { Card, List } from '../../../models';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root',
})
export class DelDataService extends DataService {
  private readonly _delService = inject(DeleteService);

  deleteList(list: List) {
    if (list.name === 'default') {
      return;
    } else {
      if (this.selectedBoard()) {
        if (this.allTickets()[this.selectedBoard()!.id]) {
          let cardsToBeDel: Card[] = this.allTickets()[
            this.selectedBoard()!.id
          ].filter((card) => card.idList === list.id);

          cardsToBeDel.map((card) => {
            this._delService.deleteCard(card.id);
          });

          if (cardsToBeDel.length !== 0) {
            this.allTickets.update((prev) => {
              return {
                ...prev,
                [this.selectedBoard()!.id]: prev[
                  this.selectedBoard()!.id
                ].filter((card) => card.idList !== list.id),
              };
            });
          }
        }
      }

      this._delService.deleteList(list.id);
      this.lists.update((prev) => {
        return {
          ...prev,
          [this.selectedBoard()!.id]: prev[this.selectedBoard()!.id].filter(
            (list) => list.id !== list.id
          ),
        };
      });
    }
  }
}
