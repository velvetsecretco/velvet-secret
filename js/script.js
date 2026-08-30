/* =========================================================
   VELVET SECRET
   SCRIPT GLOBAL DE PRODUCTOS

   Este archivo funciona para todas las categorías:
   - Lencería
   - Pijamas
   - Juguetes
   - Lubricantes
   - Disfraces
   - Accesorios
========================================================= */

const listaProductos = window.listaProductos || [];


/* =========================================================
   INICIAR PÁGINA
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTOS PRINCIPALES
    ===================================================== */

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

    const galeriaProducto =
        document.getElementById("galeriaProducto");

    const botonWhatsapp =
        document.getElementById("botonWhatsapp");

    const modalInformacion =
        document.querySelector(".modal-informacion");


    /* =====================================================
       MOSTRAR PRODUCTOS
    ===================================================== */

    function mostrarProductos(productosParaMostrar) {

        if (!contenedorProductos) {
            return;
        }

        contenedorProductos.innerHTML = "";


        productosParaMostrar.forEach(function (producto) {

            const tarjeta =
                document.createElement("article");

            tarjeta.classList.add("producto-card");

            tarjeta.dataset.categoria =
                producto.categoria || "";

            tarjeta.dataset.referencia =
                producto.referencia || "";


            const imagenPrincipal =
                producto.imagenes &&
                producto.imagenes.length > 0
                    ? producto.imagenes[0]
                    : "";


            const referenciaProducto =
                producto.referencia
                    ? `Ref. ${producto.referencia}`
                    : producto.codigo
                        ? `Código ${producto.codigo}`
                        : "";


            tarjeta.innerHTML = `

                <div class="producto-imagen">

                    ${
                        imagenPrincipal
                            ? `
                                <img
                                    src="${imagenPrincipal}"
                                    alt="${producto.nombre || "Producto Velvet Secret"}"
                                    loading="lazy"
                                >
                            `
                            : `
                                <div class="producto-sin-imagen">
                                    Velvet Secret
                                </div>
                            `
                    }

                </div>


                <div class="producto-informacion">

                    <p class="producto-categoria">
                        ${producto.nombreCategoria || ""}
                    </p>


                    <h3>
                        ${producto.nombre || ""}
                    </h3>


                    ${
                        referenciaProducto
                            ? `
                                <p class="producto-codigo">
                                    ${referenciaProducto}
                                </p>
                            `
                            : ""
                    }


                    <p class="producto-precio">
                        ${producto.precio || ""}
                    </p>


                    <button
                        class="boton-ver-producto"
                        type="button"
                    >
                        Ver producto
                    </button>

                </div>
            `;


            const boton =
                tarjeta.querySelector(
                    ".boton-ver-producto"
                );


            if (boton) {

                boton.addEventListener(
                    "click",
                    function () {

                        abrirProducto(producto);

                    }
                );

            }


            contenedorProductos.appendChild(tarjeta);

        });

    }


    /* =====================================================
       ABRIR PRODUCTO
    ===================================================== */

    function abrirProducto(producto) {

        if (!modal) {
            return;
        }


        /* -----------------------------------------------
           IMAGEN PRINCIPAL
        ----------------------------------------------- */

        if (modalImagen) {

            if (
                producto.imagenes &&
                producto.imagenes.length > 0
            ) {

                modalImagen.src =
                    producto.imagenes[0];

                modalImagen.alt =
                    producto.nombre || "Producto Velvet Secret";

                modalImagen.style.display = "block";

            } else {

                modalImagen.removeAttribute("src");

                modalImagen.alt = "";

                modalImagen.style.display = "none";

            }

        }


        /* -----------------------------------------------
           NOMBRE
        ----------------------------------------------- */

        if (modalNombre) {

            modalNombre.textContent =
                producto.nombre || "";

        }


        /* -----------------------------------------------
           REFERENCIA Y CÓDIGO
        ----------------------------------------------- */

        if (modalCodigo) {

            const datosCodigo = [];


            if (producto.referencia) {

                datosCodigo.push(
                    `Ref. ${producto.referencia}`
                );

            }


            if (producto.codigo) {

                datosCodigo.push(
                    `Código: ${producto.codigo}`
                );

            }


            modalCodigo.innerHTML =
                datosCodigo.join("<br>");

        }


        /* -----------------------------------------------
           PRECIO
        ----------------------------------------------- */

        if (modalPrecio) {

            modalPrecio.textContent =
                producto.precio || "";

        }


        /* -----------------------------------------------
           INFORMACIÓN ADICIONAL
        ----------------------------------------------- */

        crearTallas(producto);

        crearDescripcion(producto);

        crearCaracteristicas(producto);

        crearGaleria(producto);

        actualizarWhatsapp(producto);


        /* -----------------------------------------------
           ABRIR
        ----------------------------------------------- */

        modal.classList.add("abierto");

        document.body.style.overflow = "hidden";


        /* Volver el modal arriba */

        const contenidoModal =
            modal.querySelector(".modal-contenido");

        if (contenidoModal) {

            contenidoModal.scrollTop = 0;

        }

    }


    /* =====================================================
       CREAR / OBTENER CONTENEDOR EXTRA
    ===================================================== */

    function obtenerContenedor(
        id,
        clase
    ) {

        let contenedor =
            document.getElementById(id);


        if (contenedor) {

            return contenedor;

        }


        if (!modalInformacion) {

            return null;

        }


        contenedor =
            document.createElement("div");

        contenedor.id = id;

        contenedor.classList.add(clase);


        /*
           Insertamos la información justo antes
           del bloque de captura / WhatsApp.
        */

        const instruccion =
            modalInformacion.querySelector(
                ".instruccion-captura"
            );


        if (instruccion) {

            modalInformacion.insertBefore(
                contenedor,
                instruccion
            );

        } else {

            modalInformacion.appendChild(
                contenedor
            );

        }


        return contenedor;

    }


    /* =====================================================
       TALLAS
    ===================================================== */

    function crearTallas(producto) {

        const contenedor =
            obtenerContenedor(
                "modalTallas",
                "modal-tallas"
            );


        if (!contenedor) {
            return;
        }


        if (
            !Array.isArray(producto.tallas) ||
            producto.tallas.length === 0
        ) {

            contenedor.innerHTML = "";

            contenedor.style.display = "none";

            return;

        }


        contenedor.style.display = "block";


        contenedor.innerHTML = `

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
       DESCRIPCIÓN
    ===================================================== */

    function crearDescripcion(producto) {

        const contenedor =
            obtenerContenedor(
                "modalDescripcion",
                "modal-descripcion"
            );


        if (!contenedor) {
            return;
        }


        if (!producto.descripcion) {

            contenedor.innerHTML = "";

            contenedor.style.display = "none";

            return;

        }


        contenedor.style.display = "block";


        contenedor.innerHTML = `

            <h3>
                Descripción
            </h3>

            <p>
                ${producto.descripcion}
            </p>

        `;

    }


    /* =====================================================
       CARACTERÍSTICAS
    ===================================================== */

    function crearCaracteristicas(producto) {

        const contenedor =
            obtenerContenedor(
                "modalCaracteristicas",
                "modal-caracteristicas"
            );


        if (!contenedor) {
            return;
        }


        if (
            !Array.isArray(producto.caracteristicas) ||
            producto.caracteristicas.length === 0
        ) {

            contenedor.innerHTML = "";

            contenedor.style.display = "none";

            return;

        }


        contenedor.style.display = "block";


        contenedor.innerHTML = `

            <h3>
                Características
            </h3>


            <ul>

                ${producto.caracteristicas
                    .map(function (caracteristica) {

                        return `

                            <li>
                                ${caracteristica}
                            </li>

                        `;

                    })
                    .join("")}

            </ul>
        `;

    }


    /* =====================================================
       GALERÍA DE IMÁGENES
    ===================================================== */

    function crearGaleria(producto) {

        if (!galeriaProducto) {
            return;
        }


        galeriaProducto.innerHTML = "";


        if (
            !Array.isArray(producto.imagenes) ||
            producto.imagenes.length === 0
        ) {

            galeriaProducto.style.display = "none";

            return;

        }


        galeriaProducto.style.display = "flex";


        producto.imagenes.forEach(
            function (imagen, indice) {

                const miniatura =
                    document.createElement("button");


                miniatura.type = "button";

                miniatura.classList.add(
                    "miniatura-producto"
                );


                if (indice === 0) {

                    miniatura.classList.add(
                        "activa"
                    );

                }


                miniatura.innerHTML = `

                    <img
                        src="${imagen}"
                        alt="${producto.nombre || "Producto"} - imagen ${indice + 1}"
                        loading="lazy"
                    >

                `;


                miniatura.addEventListener(
                    "click",
                    function () {

                        if (modalImagen) {

                            modalImagen.src =
                                imagen;

                        }


                        const miniaturas =
                            galeriaProducto.querySelectorAll(
                                ".miniatura-producto"
                            );


                        miniaturas.forEach(
                            function (elemento) {

                                elemento.classList.remove(
                                    "activa"
                                );

                            }
                        );


                        miniatura.classList.add(
                            "activa"
                        );

                    }
                );


                galeriaProducto.appendChild(
                    miniatura
                );

            }
        );

    }


    /* =====================================================
       WHATSAPP
    ===================================================== */

    function actualizarWhatsapp(producto) {

        if (!botonWhatsapp) {
            return;
        }


        let mensaje =
            `Hola, quiero consultar la disponibilidad de ${producto.nombre || "este producto"}.`;


        if (producto.referencia) {

            mensaje +=
                ` Referencia: ${producto.referencia}.`;

        }


        if (producto.codigo) {

            mensaje +=
                ` Código: ${producto.codigo}.`;

        }


        botonWhatsapp.href =
            "https://api.whatsapp.com/send" +
            "?phone=573022657696" +
            "&text=" +
            encodeURIComponent(mensaje);

    }


    /* =====================================================
       FILTROS
    ===================================================== */

    botonesFiltro.forEach(
        function (boton) {

            boton.addEventListener(
                "click",
                function () {

                    botonesFiltro.forEach(
                        function (otroBoton) {

                            otroBoton.classList.remove(
                                "activo"
                            );

                        }
                    );


                    boton.classList.add(
                        "activo"
                    );


                    const filtro =
                        boton.dataset.filtro;


                    if (
                        !filtro ||
                        filtro === "todos"
                    ) {

                        mostrarProductos(
                            listaProductos
                        );

                        return;

                    }


                    const filtrados =
                        listaProductos.filter(
                            function (producto) {

                                return (
                                    producto.categoria ===
                                    filtro
                                );

                            }
                        );


                    mostrarProductos(
                        filtrados
                    );

                }
            );

        }
    );


    /* =====================================================
       CERRAR MODAL
    ===================================================== */

    function cerrarVentanaProducto() {

        if (!modal) {
            return;
        }


        modal.classList.remove(
            "abierto"
        );


        document.body.style.overflow = "";

    }


    if (cerrarModal) {

        cerrarModal.addEventListener(
            "click",
            cerrarVentanaProducto
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            function (evento) {

                if (evento.target === modal) {

                    cerrarVentanaProducto();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key === "Escape" &&
                modal &&
                modal.classList.contains("abierto")
            ) {

                cerrarVentanaProducto();

            }

        }
    );


    /* =====================================================
       MOSTRAR PRODUCTOS AL INICIAR
    ===================================================== */

    mostrarProductos(listaProductos);

});
