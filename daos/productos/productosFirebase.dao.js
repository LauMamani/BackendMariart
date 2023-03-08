import ContenedorFirebase from "../../contenedores/firebase.continer.js"

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super("productos")
    }
}

export default ProductosDaoFirebase
