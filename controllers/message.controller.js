import MensajesDaoMongoDb from "../daos/mensajesMongo.dao.js";
const Message = new MensajesDaoMongoDb;

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.getAll();
    res.send(messages);
  } catch (error) {
    res.send({ error: true });
  }
};

export const getMessagesByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const messages = await Message.getMensajesByEmail(email);
      res.send(messages);      
    } catch (error) {
      res.send({ error: true });
    }
  };

export const saveMessage = async (req, res) => {
  const timestamp = new Date();
  try {
    const { email, name, type, message } = req.body;
    const id = await Message.save({
      timestamp,
      email,
      name,
      type,
      message,
    });
    res.send(`Se agregó el mensaje con ID ${id}`);
  } catch (error) {
    res.send({ error: true });
  }
};

