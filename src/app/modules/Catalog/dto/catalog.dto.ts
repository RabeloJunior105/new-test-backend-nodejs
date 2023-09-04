export interface IProducts {
  title: string;
  description: string;
  price: number;
}

export interface ICatalog {
  category_title: string;
  category_description: string;
  itens: IProducts[];
}

export class CatalogDTO {
  owner: string;
  catalog: ICatalog[];
}
