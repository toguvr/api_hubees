import { Request, Response } from "express";
import { CreateProductService } from "../services/createProductService";
import { DeleteProductService } from "../services/deleteProductService";
import { ReadProductService } from "../services/readProductService";
import { ShowProductByFieldService } from "../services/showProductByFieldService";
import { ShowProductWithStockService } from "../services/showProductWithStockService";
import {
  UpdateProductService,
  UpdateProductWithStockService,
} from "../services/updateProductService";

export class ProductController {
  async create(request: Request, response: Response) {
    const { name, description, price } = request.body;
    const createProductService = new CreateProductService();

    const result = await createProductService.execute({
      name,
      description,
      price,
    });
    return response.json(result);
  }
  async read(request: Request, response: Response) {
    const createProductService = new ReadProductService();

    const result = await createProductService.execute();
    return response.json(result);
  }
  async update(request: Request, response: Response) {
    const { name, description, price, product_id } = request.body;
    const updateProductService = new UpdateProductService();

    const result = await updateProductService.execute({
      name,
      description,
      price,
      product_id,
    });
    return response.json(result);
  }

  async delete(request: Request, response: Response) {
    const { product_id } = request.params;

    const createStockService = new DeleteProductService();

    const result = await createStockService.execute(product_id);

    return response.json(result);
  }

  async show(request: Request, response: Response) {
    const { product_id } = request.params;

    const createStockService = new ShowProductWithStockService();

    const result = await createStockService.execute(product_id);

    return response.json(result);
  }

  async showByField(request: Request, response: Response) {
    const { field, value } = request.params;

    const createStockService = new ShowProductByFieldService();

    const result = await createStockService.execute({ field, value });

    return response.json(result);
  }
}
