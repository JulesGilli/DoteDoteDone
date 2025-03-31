import { inject, Injectable, signal } from '@angular/core';
import { Board, Card, List, Workspace } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  loading = signal<boolean>(true);

  workspaces = signal<Workspace[]>([]);
  selectedWorkspace = signal<Workspace | null>(null);

  boards = signal<Board[]>([]);
  selectedBoard = signal<Board | null>(null);
  allBoards = signal<Record<string, Board[]>>({});

  lists = signal<Record<string, List[]>>({});

  tickets = signal<Card[]>([]);
  allTickets = signal<Record<string, Card[]>>({});
}
