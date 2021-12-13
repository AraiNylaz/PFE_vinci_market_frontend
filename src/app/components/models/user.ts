import 'reflect-metadata';

export enum Campus {
  WOLUWE = 'Woluwe',
  IXELLES = 'Ixelles',
  LOUVAINLANEUVE = 'Louvain-La-Neuve',
}
export class User {
  idUser?: string;
  lastName?: string;
  firstName?: string;
  password?: string;
  campusName?: string;
  campus?: Campus;
  phone?: string;
  mail?: string;
  admin?: boolean;
  ban?: boolean;

  get display(): string {
    return `${this.firstName} ${this.lastName} `;
  }
}
