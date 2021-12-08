import { Type, Transform } from 'class-transformer';
import 'reflect-metadata';
import { Moment } from 'moment';
import * as moment from 'moment';
export class Offre {
  idOffer?: Number;
  iProduct?: Number;
  idBuyer?: Number;
  value?: Float32Array;
  message?: string;

  get display(): string {
    return `${(this.value, ' ', this.message)}`;
  }
}
