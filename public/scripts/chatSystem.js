const socket = io.connect();


//CHAT - Form Ingreso
const email = document.getElementById("email");
const type = document.getElementById("type");
const mensaje = document.getElementById("message");

const formPublicarMensaje = document.getElementById("formPublicarMensaje");
formPublicarMensaje.addEventListener("submit", (e) => {
  e.preventDefault();
    const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.value) {
        email.focus();
        return (errorEmail.textContent = "Complete este campo");
    } else {
        if (!regEmail.test(email.value)) {
            email.value = "";
            email.focus();
            return (errorEmail.textContent = "Formato de Email no válido");
        } else {
            errorEmail.textContent = "";
        }
    }
    
    if (!mensaje.value){
        mensaje.focus();
        return (errorMsj.textContent = "Complete este campo")
    } else {
      mensaje.focus();
      errorMsj.textContent = "";
    }

   const message = {
    message: mensaje.value,
    email: email.value,
    type: type.value,
   };
  mensaje.value="";
    mensaje.focus();
    socket.emit("newMensaje", message);
});

//CHAT - Mostrar Mensajes
const renderMessages = (msjs) => {
  const html = msjs
    .map((msj) => {
      return `
            <div>
                <b style="color:blue;">${msj.email}</b>
                [<span style="color:brown;">${msj.timestamp}</span>] :
                <i style="color:green;">${msj.message}</i>
            </div>`;
    })
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
};

socket.on("mensajes", (data) => {
   renderMessages(data);
});
