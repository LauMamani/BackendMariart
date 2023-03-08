import ContenedorFirebase from "../../contenedores/firebase.continer.js";
import admin from "firebase-admin";
import * as firestore from "firebase-admin";
import logger from "../../config/loggers.config.js";

class CarritoDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("carritos");
  }

  async saveProducts(
    id,
    id_prod,
    timestamp,
    title,
    description,
    code,
    thumbnail,
    price,
    stock
  ) {
    try {
      const db = firestore.firestore();
      db.settings({ ignoreUndefinedProperties: true });
      const newProduct = {
        id_prod,
        timestamp,
        title,
        description,
        code,
        thumbnail,
        price,
        stock,
      };

      await this.col
        .doc(id)
        .update("products", admin.firestore.FieldValue.arrayUnion(newProduct), {
          merge: true,
        });
    } catch (err) {
      logger.error(`Error- DaoCartFirebase - Funcion save: ${err}`);
    }
  }

  async deleteProdById(id, id_prod) {
    try {
      await this.col.doc(id).update({
        products: products.filter((product) => product.id !== id_prod),
      });
    } catch (err) {
      logger.error(`Error- DaoCartFirebase - Funcion deleteById: ${err}`);
    }
  }
}

export default CarritoDaoFirebase;
