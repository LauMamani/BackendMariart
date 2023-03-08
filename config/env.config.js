import * as dotenv from "dotenv";
dotenv.config();

let varEntorno;

switch (process.env.NODE_ENV) {
    case "desarrollo":
        varEntorno = {
            port: process.env.PORT_DES,
            tipo: process.env.TIPO_DES,
            mongoConnect: process.env.MONGO_CONNECT_DES,
            userMail: process.env.USER_MAIL_DES,
            passMail: process.env.PASS_MAIL_DES,
            emailAdmin : process.env.EMAIL_ADMIN,
          };
      break;
    case "produccion":
        varEntorno = {
            port: process.env.PORT_PROD,
            tipo: process.env.TIPO_PROD,
            mongoConnect: process.env.MONGO_CONNECT_PROD,
            userMail: process.env.USER_MAIL_PROD,
            passMail: process.env.PASS_MAIL_PROD,
            emailAdmin : process.env.EMAIL_ADMIN,
          };
      break;
    default:
        varEntorno = {
          port: process.env.PORT_PROD,
          tipo: process.env.TIPO_PROD,
          mongoConnect: process.env.MONGO_CONNECT_PROD,
          userMail: process.env.USER_MAIL_PROD,
          passMail: process.env.PASS_MAIL_PROD,
          };
      break;
   
  }



export default varEntorno;