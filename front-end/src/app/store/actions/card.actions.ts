import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Card } from '../../models';

export const loadCards = createActionGroup({
  source: 'Load Cards',
  events: {
    submit: props<{ cards: Card[] }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const loadCard = createActionGroup({
  source: 'Load Card',
  events: {
    submit: props<{ cardId: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const createCard = createActionGroup({
  source: 'Create Card',
  events: {
    submit: props<{ card: Card }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const updateCard = createActionGroup({
  source: 'Update Card',
  events: {
    submit: props<{ cardId: string; card: Partial<Card> }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const deleteCard = createActionGroup({
  source: 'Delete Card',
  events: {
    submit: props<{ cardId: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const assignMember = createActionGroup({
  source: 'Assign Member',
  events: {
    submit: props<{ cardId: string; memberId: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const unassignMember = createActionGroup({
  source: 'Unassign Member',
  events: {
    submit: props<{ cardId: string; memberId: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const moveCard = createActionGroup({
  source: 'Move Card',
  events: {
    submit: props<{ cardId: string; listId: string; pos: number }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});
