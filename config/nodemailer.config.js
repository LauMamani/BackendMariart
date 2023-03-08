import { createTransport } from "nodemailer";
import varEntorno from "./env.config.js";

export const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: varEntorno.userMail,
    pass: varEntorno.passMail,
  },
});
