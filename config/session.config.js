import MongoStore from "connect-mongo";
import session from "express-session";
import varEntorno from "./env.config.js";

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export default session({
    store: MongoStore.create({
      mongoUrl: varEntorno.mongoConnect,
      //ttl: 600000
    }),

    secret: "apr491rta0087w",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 8600000,
    },
    mongoOptions,
})
