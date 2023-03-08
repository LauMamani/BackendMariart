import OrdenDaoMongoDb from "../daos/ordenMongo.dao.js";
import DAOFactory from "../daos/factory.dao.js";
import { transporter } from "../config/nodemailer.config.js";
import varEntorno from "../config/env.config.js";

const Order = new OrdenDaoMongoDb;
const Cart = DAOFactory.getCarritosDAO();

// Genera Orden y elimina Carrito temporal una vez concretada la venta
export const saveOrder = async (req, res) => {
  try {
    const { dataIdCart, dataCart} = req.body;
    const timestamp = new Date();
    const email = req.user.email;
    const addres = req.user.address;
    const condition = "generada";
    const products = dataCart;
    const newId = await Order.save({ timestamp, email, addres, condition, products });
    // Envío Email: Orden Generada
    /*await transporter.sendMail({
        from: "colleen.kozey@ethereal.email",
        to: varEntorno.emailAdmin,
        subject: "Nueva Orden",
        html: `<h4>Datos de la Orden</h4>
      <ul>
        <li>Nro de Orden: ${newId}</li>
        <li>Email: ${email}</li>
        <li>Dirección: ${direccion}</li>
        <li>Productos: ${products}</li>
      </ul>`,
      });*/
    await Cart.deleteById(dataIdCart);
    res.send({ IdNewOrder: newId });
    
  } catch (err) {
    res.send({ error: true });
  }
};

