import { Schema } from "mongoose";
import ContenedorMongoDB from "../contenedores/mongo.container.js"

const products = new Schema({
  id_prod: { type: String, required: true },
  thumbnail: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
});

class OrdenDaoMongoDb extends ContenedorMongoDB {
  constructor() {
    super("ordenes", {
      timestamp: { type: Date, required: true },
      email: { type: String, required: true },
      addres: { type: String, required: true },
      condition: { type: String, required: true },
      products: [products],
    });
  }

}

export default OrdenDaoMongoDb;
