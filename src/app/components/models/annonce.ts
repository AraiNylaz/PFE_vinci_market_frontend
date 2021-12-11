import 'reflect-metadata';
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
  valid?: boolean;

  get display(): string {
    return `${(this.title, ' ', this.description)}`;
  }
}
