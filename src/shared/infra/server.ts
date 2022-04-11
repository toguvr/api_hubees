import { ConsumeMessage } from "amqplib";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { Extract } from "../../databases/mongo";
import { consume } from "../providers/RabbitMQProvider";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

consume("extract", (message: ConsumeMessage) => {
  const { quantity, name, price } = JSON.parse(message.content);

  const extract = new Extract({
    title: quantity + " " + name,
    price_un: Number(price),
    total_price: Number(quantity) * Number(price),
  });

  extract.save().then(() => console.log("salvei"));
});

app.use(
  async (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen(3333, () => console.log("rodando …"));
