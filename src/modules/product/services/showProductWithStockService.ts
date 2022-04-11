import { prisma } from "../../../databases/prismaClient";

export class ShowProductWithStockService {
  async execute(product_id: string) {
    const allInsertsOfThisProductOnStock = await prisma.product.findFirst({
      where: {
        id: product_id,
      },
      include: { stocks: true },
    });

    if (!allInsertsOfThisProductOnStock) {
      throw new Error("Product not exists!");
    }

    const totalEntriesOfThisProduct = allInsertsOfThisProductOnStock?.stocks
      .filter((stock) => stock.entry)
      .reduce((acumulador, valorAtual) => {
        return acumulador + Number(valorAtual.quantity);
      }, 0);

    const totalExitsOfThisProduct = allInsertsOfThisProductOnStock?.stocks
      .filter((stock) => !stock.entry)
      .reduce((acumulador, valorAtual) => {
        return acumulador + Number(valorAtual.quantity);
      }, 0);
    const totalStock = totalEntriesOfThisProduct - totalExitsOfThisProduct;

    return {
      ...allInsertsOfThisProductOnStock,
      totalEntriesOfThisProduct,
      totalExitsOfThisProduct,
      totalStock,
    };
  }
}
