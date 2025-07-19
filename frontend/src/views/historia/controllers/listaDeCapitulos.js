export const listaDeCapitulos = async (capitulos, historiaId, localhost, contenedor, accessToken, perfilData) => {

    const listaDeCapitulos = document.createElement('div');
    listaDeCapitulos.classList.add('lista_de_capitulos_MiHistoria');

    // Mostrar solo los primeros 5 capítulos
    // const maxMostrar = 5;
    // let mostrarTodos = false;

    if (capitulos.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No hay capítulos disponibles.';
        mensaje.classList.add('mensaje_sin_capitulos');
        listaDeCapitulos.appendChild(mensaje);
        contenedor.appendChild(listaDeCapitulos);
        return;
    }

    capitulos.forEach(async (capitulo) => {
        // Contenedor principal
        const capituloCont = document.createElement('div');
        capituloCont.classList.add('capitulo_MiHistoria');

        // link

        const capituloLink = document.createElement('a');
        capituloLink.href = `/#capitulo/${historiaId}/${capitulo.id}`; // Cambia esto si necesitas una ruta diferente
        capituloLink.classList.add('capitulo_link_MiHistoria');

        // Número de capítulo
        const capituloNumeroCont = document.createElement('div');
        capituloNumeroCont.classList.add('capitulo_numero_MiHistoria');
        const numeroCapitulo = document.createElement('p');
        numeroCapitulo.textContent = '#' + capitulo.numero_Capitulo;
        capituloNumeroCont.appendChild(numeroCapitulo);

        // Icono
        const iconoCont = document.createElement('div');
        iconoCont.classList.add('icono_Capitulo_MiHistoria');
        const iconoImg = document.createElement('img');
        iconoImg.src = localhost + capitulo.icono_Capitulo;
        iconoCont.appendChild(iconoImg);

        // Título y argumento
        const tituloArgumentoCont = document.createElement('div');
        tituloArgumentoCont.classList.add('titulo_argumento_Capitulo_MiHistoria');

        const tituloCapitulo = document.createElement('p');
        tituloCapitulo.textContent = capitulo.titulo_Capitulo;
        tituloCapitulo.classList.add('titulo_Capitulo_MiHistoria');

        const argumentoCapitulo = document.createElement('p');
        argumentoCapitulo.textContent = capitulo.argumento_Capitulo;
        argumentoCapitulo.classList.add('argumento_Capitulo_MiHistoria');

        const MeGustaCont = document.createElement('div');
        MeGustaCont.classList.add('me_gusta_Capitulo_Historia');

        const btnMeGusta = document.createElement('button');
        btnMeGusta.innerHTML = '<i class="ri-shining-line"></i>';
        btnMeGusta.classList.add('btn_me_gusta_capitulo');

        const contadorMeGusta = document.createElement('span');
        contadorMeGusta.classList.add('contador_me_gusta');

        MeGustaCont.append(btnMeGusta, contadorMeGusta);
        
        // Consulta si el usuario ya dio "me gusta"
        let yaMeGusta = false;
        let cantidadMeGusta = 0;

        // Consulta el contador de "me gusta" (sin autenticación)
        try {
            const contadorRes = await fetch(`http://localhost:3000/api/me-gusta-capitulo/${capitulo.id}`);
            // const { data: contadorData } = await contadorRes.json();
            // cantidadMeGusta = contadorData ? contadorData.length : 0;
            const contadorData = await contadorRes.json();
            cantidadMeGusta = contadorData.data.length;
        } catch (error) {
            cantidadMeGusta = 0;
        }
        contadorMeGusta.textContent = cantidadMeGusta;

        // Consulta si el usuario ya dio "me gusta" solo si está logueado
        if (perfilData && perfilData.id && accessToken) {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/me-gusta-capitulo/${capitulo.id}/${perfilData.id}`,
                    { headers: { 'Authorization': `Bearer ${accessToken}` } }
                );
                const { data } = await res.json();
                yaMeGusta = !!data;
            } catch (error) {
                yaMeGusta = false;
            }
            // Pinta el botón según el estado
            if (yaMeGusta) {
                btnMeGusta.classList.add('ya_me_gusta');
                btnMeGusta.innerHTML = '<i class="ri-shining-fill"></i>';
            } else {
                btnMeGusta.innerHTML = '<i class="ri-shining-line"></i>';
            }
            // Habilita el botón solo si hay sesión
            btnMeGusta.onclick = async () => {
                if (!yaMeGusta) {
                    try {
                        const data = {
                            id_Capitulo: capitulo.id,
                            id_Usuario: perfilData.id
                        };
                        const response = await fetch(`http://localhost:3000/api/me-gusta-capitulo`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${accessToken}`
                            },
                            body: JSON.stringify(data)
                        });
                        if (response.ok) {
                            btnMeGusta.classList.add('ya_me_gusta');
                            btnMeGusta.innerHTML = '<i class="ri-shining-fill"></i>';
                            // Actualiza el contador
                            cantidadMeGusta++;
                            contadorMeGusta.textContent = cantidadMeGusta;
                            return;
                        }
                    } catch (error) {
                        console.error('Error al dar me gusta al capítulo:', error);
                    }
                }
                try {
                    const response = await fetch(`http://localhost:3000/api/me-gusta-capitulo/${capitulo.id}/${perfilData.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    if (response.ok) {
                        btnMeGusta.classList.remove('ya_me_gusta');
                        btnMeGusta.innerHTML = '<i class="ri-shining-line"></i>';
                        yaMeGusta = false;
                        // Actualiza el contador
                        cantidadMeGusta = Math.max(0, cantidadMeGusta - 1);
                        contadorMeGusta.textContent = cantidadMeGusta;
                    }
                } catch (error) {
                    console.error('Error al quitar me gusta al capítulo:', error);
                }
            };
        } else {
            // Si no hay sesión, desactiva el botón
            btnMeGusta.disabled = true;
            btnMeGusta.title = "Inicia sesión para dar me gusta";
        }

        tituloArgumentoCont.append(tituloCapitulo, argumentoCapitulo);

        capituloLink.append(capituloNumeroCont, iconoCont, tituloArgumentoCont);

        capituloCont.append(capituloLink, MeGustaCont);

        listaDeCapitulos.appendChild(capituloCont);

    });

    contenedor.appendChild(listaDeCapitulos);

}