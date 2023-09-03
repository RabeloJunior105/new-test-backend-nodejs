import { CategoryDTO } from "@app/Category/dto/category.dto";

export class ProductDTO {
  id: string;
  title?: string;
  description?: string;
  price: Number;
  ownerId: string;
  category?: CategoryDTO;
  categoryId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: Boolean;
}
