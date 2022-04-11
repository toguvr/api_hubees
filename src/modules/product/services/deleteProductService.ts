import { prisma } from "../../../databases/prismaClient";
import { cacheProvider } from "../../../databases/redis";

interface IShowStock {
  productId: string;
}

export class DeleteProductService {
  async execute(product_id: string) {
    const allInsertsOfThisProductOnStock = await prisma.product.findFirst({
      where: {
        id: product_id,
      },
    });

    if (!allInsertsOfThisProductOnStock) {
      throw new Error("Product not exists!");
    }
    const productRemoved = await prisma.product.delete({
      where: {
        id: product_id,
      },
    });

    await cacheProvider.invalidatePrefix(`search-fields`);

    return productRemoved;
  }
}
