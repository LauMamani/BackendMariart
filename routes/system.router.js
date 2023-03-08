import path from "path";
import { Router } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const SystemRouter = new Router();

//Opción seleccionada entre Produccion / Desarrollo
const node_env = process.env.NODE_ENV;

//Variables de entorno Desarrollo
const port_des = process.env.PORT_DES;
const tipo_des = process.env.TIPO_DES;
const mongoConnect_des = process.env.MONGO_CONNECT_DES;
const userMail_des = process.env.USER_MAIL_DES;
const passMail_des = process.env.PASS_MAIL_DES;

//Variables de entorno Produccion
const port_prod = process.env.PORT_PROD;
const tipo_prod = process.env.TIPO_PROD;
const mongoConnect_prod = process.env.MONGO_CONNECT_PROD;
const userMail_prod = process.env.USER_MAIL_PROD;
const passMail_prod = process.env.PASS_MAIL_PROD;


// Ruta vista configuración Produccion y Desarrollo
SystemRouter.get("/config", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/config.ejs"), {
    node_env: node_env,
    port_des: port_des,
    tipo_des: tipo_des,
    mongoConnect_des: mongoConnect_des,
    userMail_des: userMail_des,
    passMail_des: passMail_des,
    port_prod: port_prod,
    tipo_prod: tipo_prod,
    mongoConnect_prod: mongoConnect_prod,
    userMail_prod: userMail_prod,
    passMail_prod: passMail_prod,
  });
});


// Ruta visualización Chat para contestar consultas
SystemRouter.get("/chat", (req, res) =>{
    res.render(path.join(process.cwd(), "/views/pages/chatSystem.ejs"));
});


export default SystemRouter;