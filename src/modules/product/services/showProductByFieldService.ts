import { prisma } from "../../../databases/prismaClient";
import { cacheProvider } from "../../../databases/redis";
import RedisCacheProvider from "../../../shared/providers/RedisCacheProvider";

interface IFieldProduct {
  field: "id" | "name" | "description" | "price";
  value: string;
}

export class ShowProductByFieldService {
  async execute({ field, value }: IFieldProduct) {
    if (
      field !== "id" &&
      field !== "name" &&
      field !== "description" &&
      field !== "price"
    ) {
      throw new Error(
        "You only can search for field id, name, description or price!"
      );
    }
    const cacheKey = `search-fields:${field}:${value}`;

    let allInsertsOfThisProductOnStock = await cacheProvider.recover(cacheKey);

    if (!allInsertsOfThisProductOnStock) {
      allInsertsOfThisProductOnStock = await prisma.product.findMany({
        where: {
          [field]: {
            equals: value,
          },
        },
        include: { stocks: true },
      });

      if (!allInsertsOfThisProductOnStock) {
        throw new Error("Product not found!");
      }

      await cacheProvider.save(cacheKey, allInsertsOfThisProductOnStock);
    }

    return allInsertsOfThisProductOnStock;
  }
}
