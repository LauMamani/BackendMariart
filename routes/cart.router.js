import { Router } from "express";
import authMw from "../helpers/authMw.helper.js";

const CartRouter = new Router();

import * as CartController from "../controllers/cart.controller.js";

CartRouter
  .get("/carritoId", CartController.getCartByUser)
  .post("/:id/productos", CartController.saveProdInCart)
  .get("/:id/productos", CartController.getProdInCart)
  .delete("/:id/productos/:id_prod", CartController.deleteProdInCart)
  .delete("/:id", CartController.deleteCart)
export default CartRouter;