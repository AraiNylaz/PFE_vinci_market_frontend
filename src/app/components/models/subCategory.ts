import { Category } from "./category";


export class SubCategory {
    idSubCategory ?:String;
    idCategory ?: String;
    category ?: Category;
    name ?: String;
    get display(): string {
        return `${(this.name)}`;
      }
}