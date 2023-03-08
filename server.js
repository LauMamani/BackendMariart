import express from "express";
import passport from "passport";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io"

import session from "./config/session.config.js";
import varEntorno from "./config/env.config.js"
import authRouter from "./routes/auth.router.js";
import ProductRouter from "./routes/product.router.js";
import CartRouter from "./routes/cart.router.js"
import OrderRouter from "./routes/order.router.js";
import MessageRouter from "./routes/message.router.js";
import SystemRouter from "./routes/system.router.js";
import addMessageSystem from "./helpers/messageSystem.helper.js";


//INICIALIZACION --------------------------------------------
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//CONFIG SERV / VISTAS  / RUTA ESTAT ------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

// CONFIG SESSION / PASSPORT ---------------------
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

//RUTAS ------------------------------------------------
app.use(authRouter);
app.use("/productos", ProductRouter);
app.use("/carrito", CartRouter);
app.use("/order", OrderRouter);
app.use("/chat", MessageRouter);
app.use("/sistema", SystemRouter);

//SOKET-----------------------------------

io.on("connection", async (socket) => {
  addMessageSystem(socket, io.sockets);
});

//INICIO SERVIDOR-------------------------------------------
const connectedServer = httpServer.listen(varEntorno.port, () => {
    console.log(
      `Servidor http escuchando en el puerto ${connectedServer.address().port}`
    );
  });
  
