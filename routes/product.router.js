import { Router } from "express";
import authMw from "../helpers/authMw.helper.js";

const ProductRouter = new Router();

import * as ProductController from "../controllers/product.controller.js";

ProductRouter
  .get("/", ProductController.getAllProduct)
  .get("/:id", ProductController.getProductById)
  .get("/categoria/:categoria", ProductController.getProductsByCategory)
  .post("/", ProductController.saveProduct)
  .put("/:id", ProductController.putProduct)
  .delete("/:id", ProductController.deleteProduct)
export default ProductRouter;