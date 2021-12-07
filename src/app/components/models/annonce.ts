import { Type, Transform } from 'class-transformer';
import 'reflect-metadata';
import { Moment } from 'moment';
import * as moment from 'moment';
export class Annonce {
  idAdvertissement?: number;
  status?: string;
  title?: string;
  description?: string;
  place?: string;
  idSeller?: string;
  state?: string;
  idSousCategorie?: boolean;
  creationDate?: Date;

  get display(): string {
    return `${(this.title, ' ', this.description)}`;
  }
}
