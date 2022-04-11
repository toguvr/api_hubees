import { prisma } from "../../../databases/prismaClient";
import { cacheProvider } from "../../../databases/redis";

interface ICreateProduct {
  name: string;
  description?: string;
  price: number;
}

export class CreateProductService {
  async execute({ name, description, price }: ICreateProduct) {
    const alreadyExistsProductName = await prisma.product.findFirst({
      where: {
        name: {
          mode: "insensitive",
          equals: name,
        },
      },
    });

    if (alreadyExistsProductName) {
      throw new Error("Product name already exists!");
    }

    const product = prisma.product.create({
      data: { name, description, price },
    });

    await cacheProvider.invalidatePrefix(`search-fields`);

    return product;
  }
}
