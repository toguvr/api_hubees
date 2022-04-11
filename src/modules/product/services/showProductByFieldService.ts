import { prisma } from "../../../databases/prismaClient";
import { cacheProvider } from "../../../databases/redis";
import RedisCacheProvider from "../../../shared/providers/RedisCacheProvider";

interface IFieldProduct {
  field: "id" | "name" | "description" | "price";
  value: string;
}

export class ShowProductByFieldService {
  async execute({ field, value }: IFieldProduct) {
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
