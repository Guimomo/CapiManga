export const paginasController = (contenedor) => {
    
    if (!contenedor) return;

    // Botón para agregar páginas
    const btnAdd = document.createElement('button');
    btnAdd.type = 'button';
    btnAdd.classList.add('btn_add_pagina');
    btnAdd.innerHTML = '<i class="ri-add-line"></i> Agregar página';

    // Input file oculto para seleccionar imágenes
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';
    inputFile.multiple = true;
    inputFile.style.display = 'none';

    let paginas = [];

    btnAdd.onclick = () => inputFile.click();

    inputFile.onchange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            paginas.push(file);
        });
        renderPaginas();
    };

    const renderPaginas = () => {
        contenedor.innerHTML = '';
        paginas.forEach((file, idx) => {
            const item = document.createElement('div');
            item.classList.add('pagina_item');

            // Preview
            const preview = document.createElement('img');
            preview.classList.add('preview_pagina');
            preview.src = URL.createObjectURL(file);

            // Nombre automático
            const nombre = document.createElement('span');
            nombre.classList.add('nombre_pagina');
            nombre.textContent = `Página ${idx + 1}`;

            // Botón eliminar
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn_delete_pagina');
            btnDelete.innerHTML = '<i class="ri-delete-bin-line"></i>';
            btnDelete.onclick = () => {
                paginas.splice(idx, 1);
                renderPaginas();
            };

            item.append(preview, nombre, btnDelete);
            contenedor.appendChild(item);
        });
        contenedor.appendChild(btnAdd);
    }

    // Inicializa el render y agrega el input file al DOM
    renderPaginas();
    contenedor.appendChild(inputFile);

    // Devuelve el array de archivos para subir
    return {
        getPaginas: () => paginas
    };
};

export const limpiarPaginas = () => {
    paginas = [];
}