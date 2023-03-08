import admin from "firebase-admin";
import config from "../config/db.config.js";
import logger from "../config/loggers.config.js";
import ContenedorFactory from "./factory.container.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

class ContenedorFirebase extends ContenedorFactory {
  constructor(nombreColeccion) {
    this.col = db.collection(nombreColeccion);
  }

  async getAll() {
    try {
      const query = this.col;
      const querySnapshot = await query.get();
      const objets = querySnapshot.docs;
      const found = objets.map((obj) => ({ id: obj.id, ...obj.data() }));
      return found;
    } catch (err) {
      logger.error(`Error- ContFirebase - Funcion getAll: ${err}`);
    }
  }

  async getById(id) {
    try {
      const object = await this.col.doc(id).get();
      return { id: object.id, ...object.data() };
    } catch (err) {
      logger.error(`Error- ContFirebase - Funcion getById: ${err}`);
    }
  }

  async save(objet) {
    try {
      await this.col.add(objet);
    } catch (err) {
      logger.error(`Error- ContFirebase - Funcion save: ${err}`);
    }
  }

  async changeById(elem) {
    const { id } = elem;
    try {
      const find = await this.col.doc(id).set(elem);
      return find;
    } catch (err) {
      logger.error(`Error- ContFirebase - Funcion changeById: ${err}`);
    }
  }

  async deleteById(id) {
    let found = await this.col.find({ _id: id });
    try {
      if (!found) {
        found = null;
      } else {
        await this.col.deleteOne({ _id: id });
      }
      return found;
    } catch (err) {
      logger.error(`Error- ContFirebase - Funcion deleteById: ${err}`);
    }
  }
}

export default ContenedorFirebase;
