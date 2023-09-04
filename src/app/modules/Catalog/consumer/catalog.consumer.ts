import { Consumer } from "sqs-consumer";
import { SQSClient } from "@aws-sdk/client-sqs";
import { ProductService } from "@app/Product/product.service";
import { CategoryService } from "@app/Category/category.service";
import { CatalogDTO, ICatalog, IProducts } from "../dto/catalog.dto";
import { convertToObject } from "typescript";
import { StorageBucket } from "@shared/AWS/s3/bucket";
import { Logger } from "@shared/Logger/logger.helper";

export const CatalogConsumer = () =>
  Consumer.create({
    queueUrl: String(process.env.AWS_SQS_URL),
    handleMessage: async (message) => {
      const category = new CategoryService();
      const Storage = new StorageBucket();
      const { Body: ownerId } = message;
      const ownerCategories = await category.findAllOwner(ownerId);

      const catalogObject: ICatalog[] = [];
      for (const category of ownerCategories.categories) {
        const itens: IProducts[] = category.Product.map((res) => {
          return {
            title: String(res.title),
            description: String(res.description),
            price: res.price,
          };
        });

        const catalog: ICatalog = {
          category_title: String(category.title),
          category_description: String(category.description),
          itens,
        };
        catalogObject.push(catalog);
      }

      const catalogDTO = new CatalogDTO();
      catalogDTO.owner = String(ownerId);
      catalogDTO.catalog = catalogObject;

      Storage.uploadFile(String(ownerId), catalogDTO);
      Logger().info(`changed catalog of ${ownerId}`);
    },

    sqs: new SQSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: String(process.env.AWS_ACESS_KEY),
        secretAccessKey: String(process.env.AWS_SECRET_KEY),
      },
    }),
  });
