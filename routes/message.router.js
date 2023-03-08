import { Router } from "express";

const MessageRouter = new Router();

import * as MessageController from "../controllers/message.controller.js";

MessageRouter
  .get("/", MessageController.getAllMessages)
  .get("/:email", MessageController.getMessagesByEmail)
  .post("/", MessageController.saveMessage)
export default MessageRouter;