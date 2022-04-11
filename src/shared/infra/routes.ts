import { Router } from "express";
import productRouter from "../../modules/product/routes/productsRouter";
import stockRouter from "../../modules/stock/routes/stocksRouter";

const routes = Router();

routes.use("/product", productRouter);
routes.use("/stock", stockRouter);

export default routes;
