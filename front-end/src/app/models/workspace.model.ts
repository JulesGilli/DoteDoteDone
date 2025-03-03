import { Member } from './member.model';

export interface Workspace {
  id: string;
  displayName?: string;
  description?: string;
  members?: Member[];
}
