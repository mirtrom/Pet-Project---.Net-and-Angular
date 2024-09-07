import { Category } from "./Category.model";
import { Image } from "./Image.model";
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  image: Image;
}
