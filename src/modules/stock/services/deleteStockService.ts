import { prisma } from "../../../databases/prismaClient";

export class DeleteStockService {
  async execute(stock_id: string) {
    const alreadyExistsStock = await prisma.stock.findFirst({
      where: {
        id: stock_id,
      },
    });

    if (!alreadyExistsStock) {
      throw new Error("Stock not exists!");
    }

    const stock = await prisma.stock.delete({
      where: { id: stock_id },
    });

    return stock;
  }
}
