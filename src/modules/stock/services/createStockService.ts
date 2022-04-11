import { prisma } from "../../../databases/prismaClient";
import { sendToQueue } from "../../../shared/providers/RabbitMQProvider";

interface ICreateStock {
  product_id: string;
  entry: boolean;
  quantity: number;
}

export class CreateStockService {
  async execute({ product_id, entry, quantity }: ICreateStock) {
    const alreadyExistsProduct = await prisma.product.findFirst({
      where: {
        id: product_id,
      },
      include: { stocks: true },
    });

    if (!alreadyExistsProduct) {
      throw new Error("Product not exists!");
    }

    if (!entry) {
      const totalEntriesOfThisProduct = alreadyExistsProduct?.stocks
        .filter((stock) => stock.entry)
        .reduce((acumulador, valorAtual) => {
          return acumulador + Number(valorAtual.quantity);
        }, 0);

      const totalExitsOfThisProduct = alreadyExistsProduct?.stocks
        .filter((stock) => !stock.entry)
        .reduce((acumulador, valorAtual) => {
          return acumulador + Number(valorAtual.quantity);
        }, 0);

      if (totalEntriesOfThisProduct - totalExitsOfThisProduct < quantity) {
        throw new Error("This product is out of stock!");
      }

      sendToQueue("extract", { ...alreadyExistsProduct, quantity });
    }

    const stock = await prisma.stock.create({
      data: { entry, productId: product_id, quantity },
    });

    return stock;
  }
}
