import { prisma } from "../../../databases/prismaClient";
import { cacheProvider } from "../../../databases/redis";

interface IUpdateStock {
  product_id: string;
  name: string;
  description?: string;
  price: number;
}

export class UpdateProductService {
  async execute({ name, description, price, product_id }: IUpdateStock) {
    const allInsertsOfThisProductOnStock = await prisma.product.findFirst({
      where: {
        id: product_id,
      },
    });

    if (!allInsertsOfThisProductOnStock) {
      throw new Error("Product not exists!");
    }

    if (name) {
      const productWithSameName = await prisma.product.findFirst({
        where: {
          name,
        },
      });

      if (productWithSameName && productWithSameName.id !== product_id) {
        throw new Error("Product with this name exists!");
      }
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: product_id,
      },
      data: { description, name, price },
    });

    await cacheProvider.invalidatePrefix(`search-fields`);

    return updatedProduct;
  }
}
