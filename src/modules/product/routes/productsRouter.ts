import { Router } from "express";

import { ProductController } from "../controllers/productController";

const productRouter = Router();

const productController = new ProductController();
productRouter.post("/", productController.create);
productRouter.get("/", productController.read);
productRouter.put("/", productController.update);
productRouter.delete("/:product_id", productController.delete);
productRouter.get("/:product_id", productController.show);
productRouter.get("/field/:field/value/:value", productController.showByField);

export default productRouter;
