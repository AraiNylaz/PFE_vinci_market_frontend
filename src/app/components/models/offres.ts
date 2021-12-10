import 'reflect-metadata';
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
