import 'reflect-metadata';
export class Offre {
  idOffer?: string;
  iProduct?: string;
  idBuyer?: string;
  value?: Float32Array;
  message?: string;

  get display(): string {
    return `${(this.value, ' ', this.message)}`;
  }
}
