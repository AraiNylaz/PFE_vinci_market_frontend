import 'reflect-metadata';

import { Moment } from 'moment';
import * as moment from 'moment';
import { User } from './user';
import { SubCategory } from './subCategory';

export class Annonce {
  idProduct?: string;
  status?: string;
  title?: string;
  description?: string;
  price?: Float32Array;
  idSeller?: string;
  seller?: User;
  state?: string;
  idSubCategory?: string;
  subcategory?: SubCategory;
  creationDate?: Date;
  valid?: boolean;

  get display(): string {
    return `${(this.title, ' ', this.description)}`;
  }
}
