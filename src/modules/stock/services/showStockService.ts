import { prisma } from "../../../databases/prismaClient";

export class ShowStockService {
  async execute(stock_id: string) {
    const alreadyExistsStock = await prisma.stock.findFirst({
      where: {
        id: stock_id,
      },
    });

    if (!alreadyExistsStock) {
      throw new Error("Stock not exists!");
    }

    return alreadyExistsStock;
  }
}
