import { prisma } from "../../../databases/prismaClient";

export class ReadProductService {
  async execute() {
    const products = await prisma.product.findMany();

    return products;
  }
}
