> ![logo MariArt](./assets/img/logo.png)

> ### Descripción del Proyecto:

<p>Aplicación Web desarrollada para la venta de Obras de Arte y Accesorios de Decoración.</p>



> ### Funcionamiento:


<iframe title="vimeo-player" src="https://player.vimeo.com/video/806141476?h=51892ef862" width="640" height="360" frameborder="0" allowfullscreen></iframe>



El Proyecto cuenta con los siguientes módulos:

**Configuración:**

- Se dispone de un archivo de configuración externo con opciones para Desarrollo y Producción, las mismas pueden visualizarse a través de una vista construida en ejs cuya ruta es la siguiente:
   ###### Ruta Vista Configuración: /sistema/config

**Usuarios:**

- Se permite el acceso al sistema con email y password  así como también la posibilidad de registro de un nuevo usuario, autorizados a través de Passport.

- Se realiza previamente la verificación de contraseña solicitando el reingreso al usuario y comparando que ambas contraseñas coincidan, una vez efectuado el registro, el cliente puede ingresar haciendo click en “Iniciar Sesión”.

- Una vez que haya ingresado el cliente tendrá una sesión activa de usuario con tiempo de expiración configurada y podrá ingresar a la vista de Productos para iniciar la compra.

- Además se envía un mail a una casilla configurada mediante una variable de entorno, por cada registro nuevo de usuario.

**Productos:**

- Consta de una ruta principal de productos que devuelve el listado de todos los productos disponibles para la compra. La misma se implementó en el Frontend,  y se accede una vez que el cliente se loguea correctamente.

- En esta vista el cliente puede seleccionar los artículos que desea comprar, en caso de que desee adquirir más de uno debe hacer un segundo click en el botón “Comprar” y se agregará otra unidad al carrito.

- Se definieron rutas que permiten el filtrado por categoría y por id de producto, las cuales están implementadas directamente en  Backend, los accesos son los siguientes:

   ###### Ruta Filtrar por Category: GET /produtos/categoria/:categoria
   Ejemplo: /productos/categoria/cuadro
   ###### Ruta Filtrar por Producto: GET /productos/:id
   Ejemplo: /productos/64085163d7ea1d78aab26b5a

- Además se desarrollaron todas las rutas necesarias para trabajar con el CRUD de productos y son las siguientes:
   ###### Ruta Listar todos los Producto: GET /productos
   ###### Ruta Guardar Producto: POST /productos
   ###### Ruta Actualizar un Producto: PUT /productos/:id
   ###### Ruta Elimar un Producto: DELETE /productos/:id


**Carrito:**

- El acceso al mismo permite visualizar en el Fronted, los productos adquiridos por el cliente a través de la ruta productos.

- Cuenta con botones para Eliminar los Productos que se deseen quitar del carrito y un Botón Finalizar para concluir la compra.

- Se desarrollaron todas las rutas necesarias para trabajar con el CRUD de carritos  y son las siguientes:

   ###### Ruta Buscar un Carrito disponible: GET carrito/carritoId
   ###### Ruta Guardar un Producto en un Carrito: POST /carrito/:id/productos
   ###### Ruta Mostrar Productos de un Carrito: GET /carrito/:id/productos
   ###### Borrar un Producto: DELETE /carrito/:id/productos/:id_prod
   ###### Borrar un Carrito: DELETE /carrito/:id

**Ordenes:**

- Una vez que el cliente finaliza la compra en la vista Carrito, se  generar la orden correspondiente, es enviada por email y se eliminar el carrito provisorio.

**Chat:**

- El sistema de consultas consiste en un chat general, el usuario deberá ingresar la palabra “usuario” luego su email, y posteriormente la consulta que desea realizar. Se accede al mismo a través de un botón que se encuentra en el menú en la parte superior.

- Las consultas pueden responderse a través de la ruta: 
   ###### Ruta Vista Chat Sistema: /sistema/chat

  En este caso se ingresa la palabra “sistema”, el email al que se desea responder la consulta, y la respuesta correspondiente.

 * Aclaración: El chat funciona con la aplicación corriendo en el puerto 3000.

> ### Herramientas utilizadas:

- Base de Datos Mongo DB.
- Express
- Passport
- Nodemailer
- Bcrypt
- Websocket
- Ejs

> ### Para Probar el Repositorio del Proyecto:

1. Clonar Repositorio: git clone https://github.com/LauMamani/BackendMariart 

2. Dentro de la carpeta del proyecto ejecutar: npm install

