const items = document.getElementById("items");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

let idCart;

document.addEventListener("DOMContentLoaded", (e) => {
  fetchData();
  fetchCarrito();
});


//Traer el ID del Carrito 
const fetchCarrito = async () => {
  try {
    const res = await fetch("/carrito/carritoId");
    data = await res.json();
    idCart = data._id;
    localStorage.setItem("idCarritoMariArt", idCart);
  }
  catch (error) {
    console.log(error);
  }
};

//Traer Productos de la BD de productos
const fetchData = async () => {
  try {
    const res = await fetch("/productos");
    const data = await res.json();
    pintarCards(data);
  } catch (error) {
    console.log(error);
  }
};

// Pintar productos
const pintarCards = (data) => {
  data.forEach((item) => {
    templateCard.querySelector("img").setAttribute("src", item.thumbnail);
    templateCard.querySelector("h5").textContent = item.title;
    templateCard.querySelector(".description").textContent = item.description;
    templateCard.querySelector(".price span").textContent = item.price;
    templateCard.querySelector(".category span").textContent = item.category;
    templateCard.querySelector(".btn-dark").dataset.id = item._id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
};

//Boton Agregar Productos al Carrito
document.addEventListener("click", (e) => {
  if (e.target.matches(".card .btn-dark")) {
    fetchAgregarProductos(e.target.parentElement);
  }
  e.stopPropagation();
});

//Agregar Productos al Carrito
const fetchAgregarProductos = async (objeto) => {
  try {
    const url = `/carrito/${idCart}/productos`;
    const producto = {
      id: idCart,
      id_prod: objeto.querySelector(".btn-dark").dataset.id,
      thumbnail: objeto.querySelector(".category span").textContent,
      title: objeto.querySelector(".title").textContent,
      description: objeto.querySelector(".description").textContent,
      price: objeto.querySelector(".price span").textContent,
      category: objeto.querySelector(".category span").textContent,
    };

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
