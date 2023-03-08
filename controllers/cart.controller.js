import DAOFactory from "../daos/factory.dao.js";

const Cart = DAOFactory.getCarritosDAO();

// Buscar el carrito de un usuario
export const getCartByUser = async (req, res) => {
  try {
    let found = await Cart.getCarritoByUsuario(req.user.id);
    if (found) {
       res.send(found);
    } else {
      const timestamp = new Date();
      const id_user = req.user.id;
      const products = [];
      const result = await Cart.save({ timestamp, id_user, products });
      const newId = result[0]
      res.send(newId);
    }
  } catch (err) {
    logger.error(
      `Error- MainCarrito - Ruta Buscar Carrito de un Usuario: ${err}`
    );
  }
};

// Agregar un Producto a un Carrito determinado 
export const saveProdInCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_prod, thumbnail, title, description, price, category } = req.body;
    let found = await Cart.getProductoByCarrito(id, id_prod);
    if (found) {
      await Cart.actCantProductoByCarrito(id, id_prod);
      return res.send("Cantidad Actualizada");
    } else {
      await Cart.saveProducts(id, id_prod, thumbnail, title, description, price, category);
      return res.send("Producto Cargado");
    }
    
  } catch (err) {
    res.send({ error: true });;
  }
};

// Mostrar Productos de un Carrito determinado
export const getProdInCart = async (req, res) => {
  try {
    const { id } = req.params;
    let found = await Cart.getById(id);
    if (found) {
      const { products } = found;
      res.send(products);
    } else {
      res.send("Carrito no encontrado");
    }
  } catch (err) {
    res.send({ error: true });
  }
};

// Borrar un producto de un carrito determinado
export const deleteProdInCart =  async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    await Cart.deleteProdById(id, id_prod);
    res.send("Producto Eliminado");
  } catch (err) {
    res.send({ error: true });
  }
};



// Elimina Carrito
export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await Cart.deleteById(id);
    if (found) {
      res.send("Carrito Eliminado");
    } else {
      res.send({ error: "Carrito no encontrado" });
    }
  } catch (err) {
    res.send("Error en deleteCar");
  }
};

