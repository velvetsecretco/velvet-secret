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

            const tarjeta =
                document.createElement("article");

            tarjeta.classList.add("producto-card");

            tarjeta.dataset.categoria =
                producto.categoria || "";

            tarjeta.dataset.referencia =
                producto.referencia || "";


            /* =============================================
               ELEGIR IMAGEN O VIDEO PARA LA TARJETA
            ============================================= */

            let contenidoVisual = "";

            if (
                producto.imagenes &&
                producto.imagenes.length > 0
            ) {

                contenidoVisual = `
                    <img
                        src="${producto.imagenes[0]}"
                        alt="${producto.nombre}"
                    >
                `;

            } else if (producto.video) {

                contenidoVisual = `
                    <video
                        src="${producto.video}"
                        muted
                        autoplay
                        loop
                        playsinline
                        preload="metadata"
                    ></video>
                `;

            } else {

                contenidoVisual = `
                    <div class="producto-sin-imagen">
                        Sin imagen
                    </div>
                `;
            }


            /* =============================================
               INFORMACIÓN DE LA TARJETA
            ============================================= */

            tarjeta.innerHTML = `

                <div class="producto-imagen">

                    ${contenidoVisual}

                </div>

                <div class="producto-informacion">

                    <p class="producto-categoria">
                        ${producto.nombreCategoria || ""}
                    </p>

                    <h3>
                        ${producto.nombre || ""}
                    </h3>

                    ${
                        producto.referencia
                            ? `
                                <p class="producto-codigo">
                                    Ref. ${producto.referencia}
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


            const botonVerProducto =
                tarjeta.querySelector(
                    ".boton-ver-producto"
                );

            botonVerProducto.addEventListener(
                "click",
                function () {

                    abrirProducto(producto);

                }
            );


            contenedorProductos.appendChild(
                tarjeta
            );

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


        /* =============================================
           DETENER VIDEO ANTERIOR
        ============================================= */

        const videoAnterior =
            document.getElementById("modalVideo");

        if (videoAnterior) {

            videoAnterior.pause();

            videoAnterior.currentTime = 0;

            videoAnterior.style.display = "none";

        }


        /* =============================================
           MOSTRAR IMAGEN PRINCIPAL
        ============================================= */

        if (
            producto.imagenes &&
            producto.imagenes.length > 0
        ) {

            if (modalImagen) {

                modalImagen.style.display = "block";

                modalImagen.src =
                    producto.imagenes[0];

                modalImagen.alt =
                    producto.nombre || "";

            }

        }


        /* =============================================
           PRODUCTO SOLO CON VIDEO
        ============================================= */

        else if (producto.video) {

            if (modalImagen) {

                modalImagen.style.display = "none";

            }

            mostrarVideoPrincipal(producto);

        }


        /* =============================================
           PRODUCTO SIN IMAGEN NI VIDEO
        ============================================= */

        else {

            if (modalImagen) {

                modalImagen.style.display = "none";

            }

        }


        /* =============================================
           NOMBRE
        ============================================= */

        if (modalNombre) {

            modalNombre.textContent =
                producto.nombre || "";

        }


        /* =============================================
           REFERENCIA Y CÓDIGO
        ============================================= */

        if (modalCodigo) {

            let informacionCodigo = "";

            if (producto.referencia) {

                informacionCodigo += `
                    Ref. ${producto.referencia}
                    <br>
                `;

            }

            if (producto.codigo) {

                informacionCodigo += `
                    Código: ${producto.codigo}
                `;

            }

            modalCodigo.innerHTML =
                informacionCodigo;

        }


        /* =============================================
           PRECIO
        ============================================= */

        if (modalPrecio) {

            modalPrecio.textContent =
                producto.precio || "";

        }


        crearDescripcionProducto(producto);

        crearCaracteristicasProducto(producto);

        crearInformacionDeTallas(producto);

        crearGaleriaDeImagenes(producto);

        crearGaleriaDeVideos(producto);


        modal.classList.add("abierto");

        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       MOSTRAR VIDEO PRINCIPAL
    ===================================================== */

    function mostrarVideoPrincipal(producto) {

        if (!modalImagen) {
            return;
        }

        let modalVideo =
            document.getElementById("modalVideo");


        if (!modalVideo) {

            modalVideo =
                document.createElement("video");

            modalVideo.id =
                "modalVideo";

            modalVideo.classList.add(
                "modal-video"
            );

            modalVideo.controls = true;

            modalVideo.playsInline = true;

            modalVideo.preload =
                "metadata";

            modalImagen.insertAdjacentElement(
                "afterend",
                modalVideo
            );

        }


        modalVideo.src =
            producto.video;

        modalVideo.style.display =
            "block";

        modalVideo.load();

    }


    /* =====================================================
       DESCRIPCIÓN
    ===================================================== */

    function crearDescripcionProducto(producto) {

        if (!modalPrecio) {
            return;
        }

        let contenedorDescripcion =
            document.getElementById(
                "modalDescripcion"
            );


        if (!contenedorDescripcion) {

            contenedorDescripcion =
                document.createElement("div");

            contenedorDescripcion.id =
                "modalDescripcion";

            contenedorDescripcion.classList.add(
                "modal-descripcion"
            );

            modalPrecio.insertAdjacentElement(
                "afterend",
                contenedorDescripcion
            );

        }


        if (!producto.descripcion) {

            contenedorDescripcion.innerHTML =
                "";

            contenedorDescripcion.style.display =
                "none";

            return;

        }


        contenedorDescripcion.style.display =
            "block";

        contenedorDescripcion.innerHTML = `

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

    function crearCaracteristicasProducto(producto) {

        let contenedorDescripcion =
            document.getElementById(
                "modalDescripcion"
            );


        if (!contenedorDescripcion) {
            return;
        }


        let contenedorCaracteristicas =
            document.getElementById(
                "modalCaracteristicas"
            );


        if (!contenedorCaracteristicas) {

            contenedorCaracteristicas =
                document.createElement("div");

            contenedorCaracteristicas.id =
                "modalCaracteristicas";

            contenedorCaracteristicas.classList.add(
                "modal-caracteristicas"
            );

            contenedorDescripcion.insertAdjacentElement(
                "afterend",
                contenedorCaracteristicas
            );

        }


        if (
            !producto.caracteristicas ||
            producto.caracteristicas.length === 0
        ) {

            contenedorCaracteristicas.innerHTML =
                "";

            contenedorCaracteristicas.style.display =
                "none";

            return;

        }


        contenedorCaracteristicas.style.display =
            "block";


        contenedorCaracteristicas.innerHTML = `

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
       MOSTRAR TALLAS
    ===================================================== */

    function crearInformacionDeTallas(producto) {

        if (!modalPrecio) {
            return;
        }


        let contenedorTallas =
            document.getElementById(
                "modalTallas"
            );


        if (!contenedorTallas) {

            contenedorTallas =
                document.createElement("div");

            contenedorTallas.id =
                "modalTallas";

            contenedorTallas.classList.add(
                "modal-tallas"
            );

            modalPrecio.insertAdjacentElement(
                "afterend",
                contenedorTallas
            );

        }


        if (
            !producto.tallas ||
            producto.tallas.length === 0
        ) {

            contenedorTallas.innerHTML =
                "";

            contenedorTallas.style.display =
                "none";

            return;

        }


        contenedorTallas.style.display =
            "block";


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
       CREAR GALERÍA DE IMÁGENES
    ===================================================== */

    function crearGaleriaDeImagenes(producto) {

        if (!modalImagen) {
            return;
        }


        let galeria =
            document.getElementById(
                "galeriaProducto"
            );


        if (!galeria) {

            galeria =
                document.createElement("div");

            galeria.id =
                "galeriaProducto";

            galeria.classList.add(
                "galeria-producto"
            );

            modalImagen.insertAdjacentElement(
                "afterend",
                galeria
            );

        }


        galeria.innerHTML = "";


        if (
            !producto.imagenes ||
            producto.imagenes.length === 0
        ) {

            galeria.style.display =
                "none";

            return;

        }


        galeria.style.display =
            "flex";


        producto.imagenes.forEach(
            function (imagen, indice) {

                const miniatura =
                    document.createElement(
                        "button"
                    );

                miniatura.type =
                    "button";

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
                        alt="${producto.nombre}, imagen ${indice + 1}"
                    >

                `;


                miniatura.addEventListener(
                    "click",
                    function () {


                        /* Ocultar video */

                        const modalVideo =
                            document.getElementById(
                                "modalVideo"
                            );

                        if (modalVideo) {

                            modalVideo.pause();

                            modalVideo.style.display =
                                "none";

                        }


                        /* Mostrar imagen */

                        if (modalImagen) {

                            modalImagen.style.display =
                                "block";

                            modalImagen.src =
                                imagen;

                        }


                        const todasLasMiniaturas =
                            document.querySelectorAll(
                                ".miniatura-producto"
                            );


                        todasLasMiniaturas.forEach(
                            function (otraMiniatura) {

                                otraMiniatura.classList.remove(
                                    "activa"
                                );

                            }
                        );


                        miniatura.classList.add(
                            "activa"
                        );

                    }
                );


                galeria.appendChild(
                    miniatura
                );

            }
        );

    }


    /* =====================================================
       CREAR GALERÍA DE VIDEOS
    ===================================================== */

    function crearGaleriaDeVideos(producto) {

        if (!modalImagen) {
            return;
        }


        let galeriaVideos =
            document.getElementById(
                "galeriaVideosProducto"
            );


        if (!galeriaVideos) {

            galeriaVideos =
                document.createElement("div");

            galeriaVideos.id =
                "galeriaVideosProducto";

            galeriaVideos.classList.add(
                "galeria-producto"
            );


            const galeriaImagenes =
                document.getElementById(
                    "galeriaProducto"
                );


            if (galeriaImagenes) {

                galeriaImagenes.insertAdjacentElement(
                    "afterend",
                    galeriaVideos
                );

            } else {

                modalImagen.insertAdjacentElement(
                    "afterend",
                    galeriaVideos
                );

            }

        }


        galeriaVideos.innerHTML = "";


        /* =============================================
           ACEPTAR video: "archivo.mp4"
           O videos: ["video1.mp4", "video2.mp4"]
        ============================================= */

        let videos = [];


        if (producto.video) {

            videos.push(
                producto.video
            );

        }


        if (
            producto.videos &&
            producto.videos.length > 0
        ) {

            producto.videos.forEach(
                function (video) {

                    if (!videos.includes(video)) {

                        videos.push(video);

                    }

                }
            );

        }


        if (videos.length === 0) {

            galeriaVideos.style.display =
                "none";

            return;

        }


        /*
           Si el producto solamente tiene video
           no necesitamos crear miniatura,
           porque el video ya aparece directamente.
        */

        if (
            !producto.imagenes ||
            producto.imagenes.length === 0
        ) {

            galeriaVideos.style.display =
                "none";

            return;

        }


        /*
           Si tiene imágenes + video,
           creamos botón para cambiar al video.
        */

        galeriaVideos.style.display =
            "flex";


        videos.forEach(
            function (video, indice) {

                const botonVideo =
                    document.createElement(
                        "button"
                    );

                botonVideo.type =
                    "button";

                botonVideo.classList.add(
                    "miniatura-producto",
                    "miniatura-video"
                );


                botonVideo.innerHTML = `

                    <span class="icono-video">
                        ▶
                    </span>

                    <span>
                        Video ${indice + 1}
                    </span>

                `;


                botonVideo.addEventListener(
                    "click",
                    function () {

                        if (modalImagen) {

                            modalImagen.style.display =
                                "none";

                        }


                        let modalVideo =
                            document.getElementById(
                                "modalVideo"
                            );


                        if (!modalVideo) {

                            modalVideo =
                                document.createElement(
                                    "video"
                                );

                            modalVideo.id =
                                "modalVideo";

                            modalVideo.classList.add(
                                "modal-video"
                            );

                            modalVideo.controls =
                                true;

                            modalVideo.playsInline =
                                true;

                            modalVideo.preload =
                                "metadata";

                            modalImagen.insertAdjacentElement(
                                "afterend",
                                modalVideo
                            );

                        }


                        modalVideo.src =
                            video;

                        modalVideo.style.display =
                            "block";

                        modalVideo.load();


                        const todasLasMiniaturas =
                            document.querySelectorAll(
                                ".miniatura-producto"
                            );


                        todasLasMiniaturas.forEach(
                            function (miniatura) {

                                miniatura.classList.remove(
                                    "activa"
                                );

                            }
                        );


                        botonVideo.classList.add(
                            "activa"
                        );

                    }
                );


                galeriaVideos.appendChild(
                    botonVideo
                );

            }
        );

    }


    /* =====================================================
       FILTRAR PRODUCTOS
    ===================================================== */

    botonesFiltro.forEach(function (boton) {

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


                const categoriaSeleccionada =
                    boton.dataset.filtro;


                if (
                    categoriaSeleccionada === "todos" ||
                    !categoriaSeleccionada
                ) {

                    mostrarProductos(
                        listaProductos
                    );

                    return;

                }


                const productosFiltrados =
                    listaProductos.filter(
                        function (producto) {

                            return (
                                producto.categoria ===
                                categoriaSeleccionada
                            );

                        }
                    );


                mostrarProductos(
                    productosFiltrados
                );

            }
        );

    });


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


        document.body.style.overflow =
            "";


        /* =============================================
           DETENER VIDEO
        ============================================= */

        const modalVideo =
            document.getElementById(
                "modalVideo"
            );


        if (modalVideo) {

            modalVideo.pause();

            modalVideo.currentTime =
                0;

        }

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

            if (evento.key === "Escape") {

                cerrarVentanaProducto();

            }

        }
    );


    /* =====================================================
       MOSTRAR PRODUCTOS AL CARGAR
    ===================================================== */

    mostrarProductos(
        listaProductos
    );

});
