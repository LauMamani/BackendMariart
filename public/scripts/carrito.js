const prodCarrito = document.getElementById("prodCarrito");
const pieCarrito = document.getElementById("pieCarrito");
const templateProdCarrito = document.getElementById(
  "template-prod-carrito"
).content;
const templatePieCarrito = document.getElementById(
  "template-pie-carrito"
).content;
const fragment = document.createDocumentFragment();

let idCart = localStorage.getItem("idCarritoMariArt")
let carritoObjeto = [];

document.addEventListener("DOMContentLoaded", (e) => {
    fetchMostrarCarrito();
});

//Traer Productos del Carrito del Usuario
const fetchMostrarCarrito = async () => {
  try {
    const res = await fetch(`/carrito/${idCart}/productos`);
    carritoObjeto = await res.json();
    pintarProdCarrito();
  } catch (error) {
    console.log(error);
  }
};

//Pintar Productos del Carrito
const pintarProdCarrito = () => {
  prodCarrito.textContent = "";
  pieCarrito.textContent = "";
  carritoObjeto.forEach((item) => {
    templateProdCarrito.querySelector("#title").textContent = item.title;
    templateProdCarrito.querySelector("#description").textContent =
      item.description;
    templateProdCarrito.querySelector("#quantity").textContent = item.quantity;  
    templateProdCarrito.querySelector("#price span").textContent = item.price;
    templateProdCarrito.querySelector(".btn-danger").dataset.id = item.id_prod;
    const clone = templateProdCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  prodCarrito.appendChild(fragment);

  const cartMedida = carritoObjeto.length;
  if (cartMedida > 0) {
    const clone = templatePieCarrito.cloneNode(true);
    fragment.appendChild(clone);
    pieCarrito.appendChild(fragment);
  }
};

//Boton Elimar un  Producto del Carrito
document.addEventListener("click", (e) => {
  if (e.target.matches(".list-group-item .btn-danger")) {
    fetchEliminarProducto(e.target.parentElement);
  }
  e.stopPropagation();
});

//Elimina un Producto del Carrito
const fetchEliminarProducto = async (objeto) => {
  const id_prod = objeto.querySelector(".btn-danger").dataset.id;
  try {
    const res = await fetch(`/carrito/${idCart}/productos/${id_prod}`, {
      method: "DELETE",
    });
    fetchMostrarCarrito();
  } catch (error) {
    console.log(error);
  }
};

//Boton Finalizar Compra
document.addEventListener("click", (e) => {
  if (e.target.matches(".list-group-item .btn-secondary")) {
    fetchFinalizarCompra();
  }
  e.stopPropagation();
});

const fetchFinalizarCompra = async () => {
   try {
    let data = { dataIdCart: idCart, dataCart: carritoObjeto }
    let dataJSON = JSON.stringify(data);
    const res = await fetch(`/order`, {
      method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: dataJSON
    });
    location.href = "/";
  } catch (error) {
    console.log(error);
  }
};
