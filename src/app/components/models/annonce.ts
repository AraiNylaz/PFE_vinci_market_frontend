import 'reflect-metadata';

export enum Status {
  FREE = 'A vendre',
  SELL = 'A donner',
}
export class Annonce {
  idProduct?: string;
  status?: Status;
  title?: string;
  description?: string;
  price?: Float32Array;
  idSeller?: Number;
  state?: string;
  idSubCategory?: Number;
  creationDate?: Date;
  valid?: boolean;

  get display(): string {
    return `${(this.title, ' ', this.description)}`;
  }
}
