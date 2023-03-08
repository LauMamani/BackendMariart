import { Router } from "express";
import authMw from "../helpers/authMw.helper.js";

const OrderRouter = new Router();

import * as OrderController from "../controllers/order.controller.js"

OrderRouter
  .post("/", OrderController.saveOrder)
  
export default OrderRouter;