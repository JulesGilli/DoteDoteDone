import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Board } from '../../models';

export const loadBoards = createActionGroup({
  source: 'Load Boards',
  events: {
    submit: props<{ boards: Board[] }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const loadBoard = createActionGroup({
  source: 'Load Board',
  events: {
    submit: props<{ boardId: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const createBoard = createActionGroup({
  source: 'Create Board',
  events: {
    submit: props<{ board: Board }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const updateBoard = createActionGroup({
  source: 'Update Board',
  events: {
    submit: props<{ boardId: string; board: Partial<Board> }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const deleteBoard = createActionGroup({
  source: 'Delete Board',
  events: {
    submit: props<{ boardId: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});
