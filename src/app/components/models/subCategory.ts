import { Category } from './category';

export class SubCategory {
  idSubCategory?: string;
  idCategory?: string;
  category?: Category;
  name?: string;
  subCategoryName?: string;
  get display(): string {
    return `${this.subCategoryName}`;
  }
}
