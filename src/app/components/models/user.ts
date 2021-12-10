import 'reflect-metadata';
export class User {
  idUser?: string;
  lastName?: string;
  firstName?: string;
  password?: string;
  campus?: string;
  phone?: string;
  mail?: string;
  admin?: boolean;
  ban?: boolean;

  get display(): string {
    return `${this.firstName} ${this.lastName} `;
  }
}
