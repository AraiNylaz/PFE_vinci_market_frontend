

export class Category{
    idCategory ?: string;
    name ?: String;
    category?:string;
    get display(): string {
        return `${(this.category)}`;
      }
      
}
