import { Request, Response } from "express";
import { CreateStockService } from "../services/createStockService";
import { ShowStockService } from "../services/showStockService";
import { DeleteStockService } from "../services/deleteStockService";
import { ReadStockService } from "../services/readStockService";
import { UpdateStockService } from "../services/updateStockService";

export class StockController {
  async create(request: Request, response: Response) {
    const { product_id, entry, quantity } = request.body;

    const createStockService = new CreateStockService();

    const result = await createStockService.execute({
      product_id,
      entry,
      quantity,
    });

    return response.json(result);
  }
  async read(request: Request, response: Response) {
    const readStockService = new ReadStockService();

    const result = await readStockService.execute();

    return response.json(result);
  }
  async update(request: Request, response: Response) {
    const { stock_id, entry, quantity } = request.body;
    const updateStockService = new UpdateStockService();

    const result = await updateStockService.execute({
      stock_id,
      entry,
      quantity,
    });

    return response.json(result);
  }
  async delete(request: Request, response: Response) {
    const { stock_id } = request.params;
    const updateStockService = new DeleteStockService();

    const result = await updateStockService.execute(stock_id);

    return response.json(result);
  }
  async show(request: Request, response: Response) {
    const { stock_id } = request.params;
    const updateStockService = new ShowStockService();

    const result = await updateStockService.execute(stock_id);

    return response.json(result);
  }
}
