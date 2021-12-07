import { Type, Transform } from 'class-transformer';
import 'reflect-metadata';
import { Moment } from 'moment';
import * as moment from 'moment';
export class Annonce {
  idAdvertissement?: Number;
  status?: string;
  title?: string;
  description?: string;
  place?: string;
  price?: Float32Array;
  idSeller?: Number;
  state?: string;
  idSousCategorie?: Number;
  creationDate?: Date;

  get display(): string {
    return `${(this.title, ' ', this.description)}`;
  }
}
