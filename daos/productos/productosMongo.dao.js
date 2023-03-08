import ContenedorMongoDb from "../../contenedores/mongo.container.js";
import logger from "../../config/loggers.config.js";

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("productos", {
      timestamp: { type: Date, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      code: { type: String, required: true },
      thumbnail: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
      category: { type: String, required: true },
    });
  }
   // Mostrar Productos X Categoria
   async getProductosByCategoria(categoria) {
    try {
      const objets = await this.col.find({ category: categoria });
      return objets;
    } catch (err) {
      logger.error(`Error- DaoProductMongo - Funcion getProductoByCategoria: ${err}`);
    }
  }
}

export default ProductosDaoMongoDb;
