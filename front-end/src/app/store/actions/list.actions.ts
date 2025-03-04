import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { List } from '../../models';

export const loadLists = createActionGroup({
  source: 'Load List',
  events: {
    submit: props<{ listId: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const loadList = createActionGroup({
  source: 'Load List',
  events: {
    submit: props<{ listId: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const createList = createActionGroup({
  source: 'Create List',
  events: {
    submit: props<{ listId: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const updateList = createActionGroup({
  source: 'Update List',
  events: {
    submit: props<{ listId: string; list: Partial<List> }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const deleteList = createActionGroup({
  source: 'Delete List',
  events: {
    submit: props<{ listId: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});
