import ProductosDaoMemoria from "./productos/productosMemoria.dao.js";
import CarritoDaoMemoria from "./carritos/carritoMemoria.dao.js";
import ProductosDaoArchivos from "./productos/productosArchivo.dao.js";
import CarritoDaoArchivo from "./carritos/carritoArchivo.dao.js";
import ProductosDaoMongoDb from "./productos/productosMongo.dao.js";
import CarritoDaoMongoDb from "./carritos/carritoMongo.dao.js";
import ProductosDaoFirebase from "./productos/productosFirebase.dao.js";
import CarritoDaoFirebase from "./carritos/carritoFirebase.dao.js";
import varEntorno from "../config/env.config.js";


let ProductosDao;
let CarritosDao;

switch (varEntorno.tipo) {
  case "memoria":
    ProductosDao = new ProductosDaoMemoria();
    CarritosDao = new CarritoDaoMemoria();
    break;
  case "archivos":
    ProductosDao = new ProductosDaoArchivos();
    CarritosDao = new CarritoDaoArchivo();
    break;
  case "mongodb":
    ProductosDao = new ProductosDaoMongoDb();
    CarritosDao = new CarritoDaoMongoDb();
    break;
  case "firebase":
    ProductosDao = new ProductosDaoFirebase();
    CarritosDao = new CarritoDaoFirebase();
    break;
}

export default class DAOFactory {
  static getProductosDAO() {
    return ProductosDao;
  }

  static getCarritosDAO() {
    return CarritosDao;
  }
}

DAOFactory.getProductosDAO();
DAOFactory.getCarritosDAO();
