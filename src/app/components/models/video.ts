import 'reflect-metadata';
export class Video{
    idVideo ?: string;
    idProduct ?:string;

    nameVideo ?: String;
    get display(): string {
        return `${(this.nameVideo)}`;
      }
}