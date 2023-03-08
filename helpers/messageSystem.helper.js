import fetch from 'node-fetch';

export default async function addMessageSystem(socket, sockets) {
    let res = await fetch("http://localhost:3000/chat");
    let msjObjeto = await res.json();
    socket.emit('mensajes', msjObjeto);

       socket.on('newMensaje', async (data) => {
        const email = data.email;
        const type = data.type;
        const message = data.message;
        let msj = {
          email,
          type,
          message,
        }

        let msjJSON = JSON.stringify(msj);
        res = await fetch("http://localhost:3000/chat", {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: msjJSON
        });

        res = await fetch("http://localhost:3000/chat");
        msjObjeto = await res.json();
        socket.emit('mensajes', msjObjeto);
      })
}