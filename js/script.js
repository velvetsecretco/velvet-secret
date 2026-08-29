/* =========================================================
   PRODUCTOS DE VELVET SECRET
   Para agregar otro producto, copia el bloque que está
   dentro de listaProductos y cambia sus datos.
========================================================= */
const listaProductos = window.listaProductos || [];

/* =========================================================
   INICIAR LA PÁGINA
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const contenedorProductos =
        document.getElementById("contenedorProductos");

    const botonesFiltro =
        document.querySelectorAll(".filtro");

    const modal =
        document.getElementById("modalProducto");

    const cerrarModal =
        document.getElementById("cerrarModal");

    const modalImagen =
        document.getElementById("modalImagen");

    const modalNombre =
        document.getElementById("modalNombre");

    const modalCodigo =
        document.getElementById("modalCodigo");

    const modalPrecio =
        document.getElementById("modalPrecio");

    /* =====================================================
       CREAR LAS TARJETAS DE PRODUCTOS
    ===================================================== */

    function mostrarProductos(productosParaMostrar) {

        if (!contenedorProductos) {
            console.error(
                'No se encontró un elemento con id="contenedorProductos".'
            );

            return;
        }

        contenedorProductos.innerHTML = "";

        productosParaMostrar.forEach(function (producto) {

            const tarjeta = document.createElement("article");

            tarjeta.classList.add("producto-card");

            tarjeta.dataset.categoria = producto.categoria;
            tarjeta.dataset.referencia = producto.referencia;

            tarjeta.innerHTML = `
                <div class="producto-imagen">
                    <img
                        src="${producto.imagenes[0]}"
                        alt="${producto.nombre}"
                    >
                </div>

                <div class="producto-informacion">

                    <p class="producto-categoria">
                        ${producto.nombreCategoria}
                    </p>

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <p class="producto-codigo">
                        Ref. ${producto.referencia}
                    </p>

                    <p class="producto-precio">
                        ${producto.precio}
                    </p>

                    <button
                        class="boton-ver-producto"
                        type="button"
                    >
                        Ver producto
                    </button>

                </div>
            `;

            const botonVerProducto =
                tarjeta.querySelector(".boton-ver-producto");

            botonVerProducto.addEventListener(
                "click",
                function () {
                    abrirProducto(producto);
                }
            );

            contenedorProductos.appendChild(tarjeta);

        });

    }

    /* =====================================================
       ABRIR EL PRODUCTO
    ===================================================== */

    function abrirProducto(producto) {

        if (!modal) {
            console.error(
                'No se encontró el modal con id="modalProducto".'
            );

            return;
        }

        if (modalImagen) {
            modalImagen.src = producto.imagenes[0];
            modalImagen.alt = producto.nombre;
        }

        if (modalNombre) {
            modalNombre.textContent = producto.nombre;
        }

        if (modalCodigo) {
            modalCodigo.innerHTML = `
                Ref. ${producto.referencia}
                <br>
                Código: ${producto.codigo}
            `;
        }

       if (modalPrecio) {
    modalPrecio.textContent = producto.precio;
}

crearDescripcionProducto(producto);
crearCaracteristicasProducto(producto);
crearInformacionDeTallas(producto);
crearGaleriaDeImagenes(producto);

        modal.classList.add("abierto");

        document.body.style.overflow = "hidden";

    }

function crearDescripcionProducto(producto) {

    if (!modalPrecio) {
        return;
    }

    let contenedorDescripcion =
        document.getElementById("modalDescripcion");

    if (!contenedorDescripcion) {

        contenedorDescripcion = document.createElement("div");

        contenedorDescripcion.id = "modalDescripcion";
        contenedorDescripcion.classList.add("modal-descripcion");

        modalPrecio.insertAdjacentElement(
            "afterend",
            contenedorDescripcion
        );
    }

    if (!producto.descripcion) {
        contenedorDescripcion.innerHTML = "";
        contenedorDescripcion.style.display = "none";
        return;
    }

    contenedorDescripcion.style.display = "block";

    contenedorDescripcion.innerHTML = `
        <h3>Descripción</h3>
        <p>${producto.descripcion}</p>
    `;
}

function crearCaracteristicasProducto(producto) {

    let contenedorDescripcion =
        document.getElementById("modalDescripcion");

    if (!contenedorDescripcion) {
        return;
    }

    let contenedorCaracteristicas =
        document.getElementById("modalCaracteristicas");

    if (!contenedorCaracteristicas) {

        contenedorCaracteristicas = document.createElement("div");

        contenedorCaracteristicas.id = "modalCaracteristicas";
        contenedorCaracteristicas.classList.add("modal-caracteristicas");

        contenedorDescripcion.insertAdjacentElement(
            "afterend",
            contenedorCaracteristicas
        );
    }

    if (
        !producto.caracteristicas ||
        producto.caracteristicas.length === 0
    ) {
        contenedorCaracteristicas.innerHTML = "";
        contenedorCaracteristicas.style.display = "none";
        return;
    }

    contenedorCaracteristicas.style.display = "block";

    contenedorCaracteristicas.innerHTML = `
        <h3>Características</h3>

        <ul>
            ${producto.caracteristicas
                .map(function (caracteristica) {
                    return `
                        <li>${caracteristica}</li>
                    `;
                })
                .join("")}
        </ul>
    `;
}
    /* =====================================================
       MOSTRAR LAS TALLAS EN EL MODAL
    ===================================================== */

function crearInformacionDeTallas(producto) {

    if (!modalPrecio) {
        return;
    }

    let contenedorTallas =
        document.getElementById("modalTallas");

    if (!contenedorTallas) {

        contenedorTallas = document.createElement("div");

        contenedorTallas.id = "modalTallas";
        contenedorTallas.classList.add("modal-tallas");

        modalPrecio.insertAdjacentElement(
            "afterend",
            contenedorTallas
        );
    }

    if (!producto.tallas || producto.tallas.length === 0) {
        contenedorTallas.innerHTML = "";
        contenedorTallas.style.display = "none";
        return;
    }

    contenedorTallas.style.display = "block";

    contenedorTallas.innerHTML = `
        <p class="titulo-tallas">
            Tallas disponibles
        </p>

        <div class="lista-tallas">
            ${producto.tallas
                .map(function (talla) {
                    return `
                        <span class="talla">
                            ${talla}
                        </span>
                    `;
                })
                .join("")}
        </div>
    `;
}           

    /* =====================================================
       CREAR LA GALERÍA DE COLORES
    ===================================================== */

    function crearGaleriaDeImagenes(producto) {

        if (!modalImagen) {
            return;
        }

        let galeria =
            document.getElementById("galeriaProducto");

        if (!galeria) {

            galeria = document.createElement("div");

            galeria.id = "galeriaProducto";
            galeria.classList.add("galeria-producto");

            modalImagen.insertAdjacentElement(
                "afterend",
                galeria
            );

        }

        galeria.innerHTML = "";

        producto.imagenes.forEach(function (imagen, indice) {

            const miniatura = document.createElement("button");

            miniatura.type = "button";

            miniatura.classList.add("miniatura-producto");

            if (indice === 0) {
                miniatura.classList.add("activa");
            }

            miniatura.innerHTML = `
                <img
                    src="${imagen}"
                    alt="${producto.nombre}, color ${indice + 1}"
                >
            `;

            miniatura.addEventListener("click", function () {

                modalImagen.src = imagen;

                const todasLasMiniaturas =
                    galeria.querySelectorAll(
                        ".miniatura-producto"
                    );

                todasLasMiniaturas.forEach(
                    function (otraMiniatura) {
                        otraMiniatura.classList.remove("activa");
                    }
                );

                miniatura.classList.add("activa");

            });

            galeria.appendChild(miniatura);

        });

    }

    /* =====================================================
       FILTRAR PRODUCTOS
    ===================================================== */

    botonesFiltro.forEach(function (boton) {

        boton.addEventListener("click", function () {

            botonesFiltro.forEach(function (otroBoton) {
                otroBoton.classList.remove("activo");
            });

            boton.classList.add("activo");

            const categoriaSeleccionada =
                boton.dataset.filtro;

            if (
                categoriaSeleccionada === "todos" ||
                !categoriaSeleccionada
            ) {
                mostrarProductos(listaProductos);
                return;
            }

            const productosFiltrados =
                listaProductos.filter(function (producto) {

                    return (
                        producto.categoria ===
                        categoriaSeleccionada
                    );

                });

            mostrarProductos(productosFiltrados);

        });

    });

    /* =====================================================
       CERRAR EL MODAL
    ===================================================== */

    function cerrarVentanaProducto() {

        if (!modal) {
            return;
        }

        modal.classList.remove("abierto");

        document.body.style.overflow = "";

    }

    if (cerrarModal) {

        cerrarModal.addEventListener(
            "click",
            cerrarVentanaProducto
        );

    }

    if (modal) {

        modal.addEventListener("click", function (evento) {

            if (evento.target === modal) {
                cerrarVentanaProducto();
            }

        });

    }

    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape") {
            cerrarVentanaProducto();
        }

    });

    /* =====================================================
       MOSTRAR PRODUCTOS AL CARGAR LA PÁGINA
    ===================================================== */

    mostrarProductos(listaProductos);

});
