import ContenedorArchivo from "../../contenedores/archivo.container.js";

class ProductosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("./data/products.json");
  }
}

export default ProductosDaoArchivo;
