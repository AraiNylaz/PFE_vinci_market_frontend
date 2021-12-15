import 'reflect-metadata';
export class Picture{
    idPicture ?: string;
    idProduct ?:string;

    namePicture ?: String;
    get display(): string {
        return `${(this.namePicture)}`;
      }
}