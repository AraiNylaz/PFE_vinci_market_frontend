import { Type, Transform } from 'class-transformer';
import 'reflect-metadata';
import { Moment } from 'moment';
import * as moment from 'moment';

export class User {
  idUser?: string;
  lastName?: string;
  firstName?: string;
  password?: string;
  campus?: string;
  phone?: string;
  mail?: string;
  isAdmin?: boolean;
  isBan?: boolean;

  get display(): string {
    return `${this.firstName} ${this.lastName} `;
  }
}
