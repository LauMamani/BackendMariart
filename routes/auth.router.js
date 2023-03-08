import { Router } from "express";
import path from "path";
import passport from "../config/passport.config.js"
import authMw from "../helpers/authMw.helper.js";
import { transporter } from "../config/nodemailer.config.js";
import varEntorno from "../config/env.config.js";

const authRouter = new Router();

// Mostrar home o login
authRouter.get("/", (req, res) => {
  if (req.isAuthenticated()) {
      res.render(path.join(process.cwd(), "/views/pages/home.ejs"), {
  });
  } else {
    res.redirect("/login");
  }
});

// Mostrar formulario login
authRouter.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render(path.join(process.cwd(), "/views/pages/login.ejs"));
  }
});

// Loguear Usuario
authRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/errorLogin" }),
  (req, res) => {
    res.redirect("/");
  }
);

// Mostrar formulario registro
authRouter.get("/signup", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/register.ejs"), {
    okRegister: " ",
  });
});

// Registar Usuario
authRouter.post(
  "/signup",
   passport.authenticate("signup", { failureRedirect: "/errorRegister" }),
   async (req, res, next) => {
    res.render(path.join(process.cwd(), "/views/pages/register.ejs"), {
      okRegister: "¡Usuario registrado con éxito! Puede Iniciar Sesion",
    });
    // Envío Email: Info Usuario Registrado
    /*const email = req.user.email;
    const name = req.user.name;
    const direccion = req.user.address;
    const telefono = req.user.phone;
    try {
      await transporter.sendMail({
        from: "colleen.kozey@ethereal.email",
        to: varEntorno.emailAdmin,
        subject: "Nuevo Registro",
        html: `<h4>Datos del Usuario</h4>
      <ul>
        <li>Email: ${email}</li>
        <li>Nombre: ${name}</li>
        <li>Dirección: ${direccion}</li>
        <li>Telefono: ${telefono}</li>
      </ul>`,
      });
     } catch (error) {
      console.log(error);
    }*/
   
  }
);


authRouter.get("/datos", authMw, (req, res) => {
   const email = req.user.email;
   const name = req.user.name;
   const datos = { email, name }
   res.send(datos);
});

// Mostrar Carrito de Usuario Logueado
authRouter.get("/carrito", authMw, (req, res) => {
  res.render("pages/carrito.ejs");
});

// Mostrar Chat Comsultas
authRouter.get("/chatUsuario",  (req, res) => {
  res.render("pages/chatSystem.ejs");
});

// Vista Logout Usuario
authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.render("pages/logout.ejs");
  });
});

// Vista Error Login
authRouter.get("/errorLogin", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/errorLogin.ejs"));
});

// Vista Error Registro
authRouter.get("/errorRegister", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/errorRegister.ejs"));
});



export default authRouter;
