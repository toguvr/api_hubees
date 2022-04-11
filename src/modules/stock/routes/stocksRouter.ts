import { Router } from "express";

import { StockController } from "../controllers/stockController";

const stockRouter = Router();

const stockController = new StockController();
stockRouter.post("/", stockController.create);
stockRouter.get("/", stockController.read);
stockRouter.put("/", stockController.update);
stockRouter.delete("/:stock_id", stockController.delete);
stockRouter.get("/:stock_id", stockController.show);

export default stockRouter;
