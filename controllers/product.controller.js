import DAOFactory from "../daos/factory.dao.js";
import productDTO from "../dto/product.dto.js"

const Product = DAOFactory.getProductosDAO();

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.getAll();
    const productsDTO = products.map((product) => productDTO(product))
    res.send(productsDTO);
  } catch (error) {
    res.send({ error: true });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await Product.getById(id);
    if (found) {
      const foundDTO = productDTO(found);
      res.send(foundDTO);
    } else {
      res.send({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoria } = req.params;
    const products = await Product.getProductosByCategoria(categoria)
    if (products) {
      const productsDTO = products.map((product) => productDTO(product))
      res.send(productsDTO);
    } else {
      res.send({ error: "Categoria no encontrada" });
    }
  } catch (error) {
    res.send({ error: true });
  }
};

export const saveProduct = async (req, res) => {
  const timestamp = new Date();
  try {
    const { title, description, code, thumbnail, price, stock, category } = req.body;
    const id = await Product.save({
      timestamp,
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
      category,
    });
    res.send(`Se agregó el producto: ${title} con ID ${id}`);
  } catch (error) {
    res.send({ error: true });
  }
};

export const putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { timestamp, title, description, code, thumbnail, price, stock, category } =
      req.body;
    const found = await Product.changeById({
      id,
      timestamp,
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
      category,
    });
    if (found) {
      res.send("Producto Modificado");
    } else {
      res.send({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await Product.deleteById(id);
    if (found) {
      res.send("Producto Eliminado");
    } else {
      res.send({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
};


