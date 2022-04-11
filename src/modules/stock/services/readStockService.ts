import { prisma } from "../../../databases/prismaClient";

export class ReadStockService {
  async execute() {
    const stocks = await prisma.stock.findMany();

    return stocks;
  }
}
