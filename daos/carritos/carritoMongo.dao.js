import { Schema } from "mongoose";
import ContenedorMongoDB from "../../contenedores/mongo.container.js";
import logger from "../../config/loggers.config.js";

const products = new Schema({
  id_prod: { type: String, required: true },
  thumbnail: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
});

class CarritoDaoMongoDb extends ContenedorMongoDB {
  constructor() {
    super("carritos", {
      timestamp: { type: Date, required: true },
      id_user: { type: String, required: true },
      products: [products],
    });
  }

  // Guardar un Producto en un Carrito Puntual
  async saveProducts(
    id,
    id_prod,
    thumbnail,
    title,
    description,
    price,
    category,
   ) {
    try {
      const newProduct = {
        id_prod,
        thumbnail,
        title,
        description,
        price,
        category,
        quantity: 1
      };
      await this.col.findByIdAndUpdate(
        { _id: id },
        { $push: { products: newProduct } }
      );
    } catch (err) {
      logger.error(`Error- DaoCartMongo - Funcion save: ${err}`);
    }
  }

   // Buscar un Producto en un Carrito determinado 
  async getProductoByCarrito(id, id_prod) {
    try {
      const objets = await this.col.findOne({
        $and: [{ _id: id }, { "products.id_prod": {$eq: id_prod}}],
      });
      return objets;
    } catch (err) {
      logger.error(`Error- DaoCartMongo - Funcion getCarritoByUsuario: ${err}`);
    }
  }    

  // Actualizar Cantidad de un Producto existente en un Carrito
  async actCantProductoByCarrito(id, id_prod) {
    try {
      await this.col.updateOne( { _id: id }, { $inc: {'products.$[elem].quantity': 1} }, { arrayFilters: [{'elem.id_prod': id_prod}] })
    } catch (err) {
      logger.error(`Error- DaoCartMongo - Funcion getCarritoByUsuario: ${err}`);
    }
  }    

  // Borrar un Producto de un Carrito Puntual
  async deleteProdById(id, id_prod) {
    try {
      await this.col.updateOne(
        { _id: id },
        { $pull: { products: { id_prod: id_prod } } }
      );
    } catch (err) {
      logger.error(`Error- DaoCartMongo - Funcion deleteProdById: ${err}`);
    }
  }

  // Buscar un Carrito no Finalizado p/ un Usuario
  async getCarritoByUsuario(id) {
    try {
      const objets = await this.col.findOne({
        $and: [{ id_user: id }, { finCompra: false }],
      });
      return objets;
    } catch (err) {
      logger.error(`Error- DaoCartMongo - Funcion getCarritoByUsuario: ${err}`);
    }
  }

}

export default CarritoDaoMongoDb;
