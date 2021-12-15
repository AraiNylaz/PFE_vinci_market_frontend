import { Category } from "./category";


export class SubCategory {
    idSubCategory ?:String;
    idCategory ?: String;
    category ?: Category;
    name ?: String;
    subCategoryName?: String;
    get display(): string {
        return `${(this.subCategoryName)}`;
      }
}