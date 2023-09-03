export class CategoryDTO {
  id: string;
  title?: string;
  description?: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: Boolean;
}
