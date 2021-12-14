

export class Category{
    idCategory ?: string;
    name ?: String;
    get display(): string {
        return `${(this.name)}`;
      }
}
