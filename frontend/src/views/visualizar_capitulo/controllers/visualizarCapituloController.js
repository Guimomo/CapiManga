import { getData } from "../../../helpers/auth";

export const visualizarCapituloController = async () => {

    const { accessToken } = getData();
    const backendUrl = 'http://localhost:3000';

    const hash = window.location.hash;
    const historiaId = hash.split('/')[1];
    const capituloId = hash.split('/')[2];

    const tituloCapitulo = document.querySelector('.titulo_Capitulo');
    const argumentoCapitulo = document.querySelector('.argumento_Capitulo');
    const iconoCapitulo = document.querySelector('.icono_Capitulo');

    const ResponseCapitulo = await fetch(`http://localhost:3000/api/capitulos/${historiaId}/${capituloId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const { data: capitulo } = await ResponseCapitulo.json();

    tituloCapitulo.textContent = '#' + capitulo.numero_Capitulo + ' ' + capitulo.titulo_Capitulo;
    argumentoCapitulo.textContent = capitulo.argumento_Capitulo;
    const iconoImg = document.createElement('img');
    iconoImg.src = backendUrl + capitulo.icono_Capitulo;
    iconoCapitulo.appendChild(iconoImg);

    const ResponseCapitulos = await fetch(`http://localhost:3000/api/capitulos/historia/${historiaId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const { data: capitulos } = await ResponseCapitulos.json();

    const lista_Capitulos = document.querySelector('#lista_Capitulos');

    capitulos.forEach((capitulo) => {

        const option = document.createElement('option');
        option.value = capitulo.id;
        option.textContent = `#${capitulo.numero_Capitulo} ${capitulo.titulo_Capitulo}`;

        // Selecciona si coincide con el capítulo actual
        if (capitulo.id == capituloId) {
            option.selected = true;
        }

        lista_Capitulos.appendChild(option);
    });

    lista_Capitulos.addEventListener('change', (e) => {
        const capituloIdSeleccionado = e.target.value;
        window.location.hash = `capitulo/${historiaId}/${capituloIdSeleccionado}`;
    });

    // mostrar paginas capitulo
    const contenedonidoCapitulo = document.querySelector('.contenido_Capitulo');
    const paginasCont = document.createElement('div');
    paginasCont.classList.add('paginas_Capitulo');

    const ResponsePaginas = await fetch(`http://localhost:3000/api/paginas-capitulo/capitulo/${capituloId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const { data: paginas } = await ResponsePaginas.json();

    paginas.forEach((pagina) => {
        const paginaItem = document.createElement('div');
        paginaItem.classList.add('pagina_Capitulo');

        const img = document.createElement('img');
        img.src = backendUrl + pagina.pagina_img;
        img.alt = `Página ${pagina.pagina_numero}`;


        paginaItem.appendChild(img);

        paginasCont.appendChild(paginaItem);
    });

    contenedonidoCapitulo.appendChild(paginasCont);

}