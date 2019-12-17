import { Request, Response } from "express";
import { getOrder, postOrder, cancelOrder, updateOrder} from "./OrderController";
import { Order } from "./interfaces";

export default [
  {
    path: "/api/v1/order",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const result = await getOrder(req.query)
        res.status(200).send(result);
      }
    ]
  },

  {
    path: "/api/v1/order",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
      const order = req.body as Order
      const result = await postOrder(order)
      res.status(200).send(result);
      }
    ]
  },

  {
    path: "/api/v1/order/:id",
    method: "patch",
    handler: [
      async (req: Request, res: Response) => {
      const orderId = req.params['id']
      const result = await cancelOrder(orderId)
      res.status(200).send(result);
      }
    ]
  },

  {
    path: "/api/v1/order/:id",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
      const orderId = req.params['id']
      const order = req.body as Order
      const result = await updateOrder(orderId, order)
      res.status(200).send(result);
      }
    ]
  },
];
