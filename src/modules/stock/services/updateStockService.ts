import { prisma } from "../../../databases/prismaClient";

interface IUpdateStock {
  stock_id: string;
  entry: boolean;
  quantity: number;
}

export class UpdateStockService {
  async execute({ stock_id, quantity, entry }: IUpdateStock) {
    const alreadyExistsStock = await prisma.stock.findFirst({
      where: {
        id: stock_id,
      },
    });

    if (!alreadyExistsStock) {
      throw new Error("Stock not exists!");
    }

    const stock = await prisma.stock.update({
      where: { id: stock_id },
      data: { entry, quantity },
    });

    return stock;
  }
}
