import { Label } from './label.model';

export interface Card {
  id: string;
  name: string;
  desc?: string;
  idBoard: string;
  idList: string;
  pos?: number;
  idMembers?: string[];
  labels?: Label[];
  closed?:boolean;
}
