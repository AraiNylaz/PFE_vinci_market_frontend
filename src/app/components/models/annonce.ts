import { Type, Transform } from 'class-transformer';
import 'reflect-metadata';
import { Moment } from 'moment';
import * as moment from 'moment';
import { User } from './user';
import { SubCategory } from './subCategory';
export class Annonce {
  idProduct?: String;
  status?: string;
  title?: string;
  description?: string;
  place?: string;
  price?: Float32Array;
  idSeller?:string;
  seller ?: User;
  state?: string;
  idSubCategory?: string;
  subcategory?:SubCategory;
  creationDate?: Date;

  get display(): string {
    return `${(this.title, ' ', this.description)}`;
  }
}
