import 'reflect-metadata';
import { User } from './user';
export class Offre {
  idProduct?: string;
  idBuyer?: string;
  value?: Float32Array;
  message?: string;
  buyer?: User;

  get display(): string {
    return `prix :${(this.value, '  ', this.message)}`;
  }
}
