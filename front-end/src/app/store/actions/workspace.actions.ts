import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Workspace } from '../../models';

export const loadWorkspaces = createActionGroup({
  source: 'Load Workspaces',
  events: {
    submit: props<{ workspaces: Workspace[] }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const loadWorkspace = createActionGroup({
  source: 'Load Workspace',
  events: {
    submit: props<{ workspaceId: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const createWorkspace = createActionGroup({
  source: 'Create Workspace',
  events: {
    submit: props<{ workspace: Workspace }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const updateWorkspace = createActionGroup({
  source: 'Update Workspace',
  events: {
    submit: props<{ workspaceId: string; workspace: Partial<Workspace> }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const deleteWorkspace = createActionGroup({
  source: 'Delete Workspace',
  events: {
    submit: props<{ workspaceId: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const addMember = createActionGroup({
  source: 'Add Member',
  events: {
    submit: props<{ workspaceId: string; memberId: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});
