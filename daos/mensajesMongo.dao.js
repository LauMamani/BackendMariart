import ContenedorMongoDb from "../contenedores/mongo.container.js";
import logger from "../config/loggers.config.js";

class MensajesDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("mensajes", {
      timestamp: { type: Date, required: true },
      email: { type: String, required: true },
      type: { type: String, required: false },
      message: { type: String, required: true },
    });
  }
   // Mostrar Mensajes X Email
   async getMensajesByEmail(email) {
    try {
      const objets = await this.col.find({ email: email });
      return objets;
    } catch (err) {
      logger.error(`Error- DaoMessageMongo - Funcion getMensajesByEmail: ${err}`);
    }
  }
}

export default MensajesDaoMongoDb;
