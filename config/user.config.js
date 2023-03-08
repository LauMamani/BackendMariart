import mongoose from "mongoose";
import varEntorno from "./env.config.js";

// Config Mongo
mongoose.set("strictQuery", true);
mongoose.connect(varEntorno.mongoConnect, (err) => {
  if (err) console.error(err);
  console.log("conectados a mongo");
});

export const Users = mongoose.model("users", {
  email: String,
  password: String,
  name: String,
  address: String,
  phone: String,
});
