import Swal from 'sweetalert2';
import Cropper from 'cropperjs';
import { getData } from '../../../helpers/auth';

export const subirHistoriaController = async () => {
    const form = document.getElementById('formCrearHistoria');
    const genero_Id = document.getElementById('genero_Id');
    const subgenero_Id = document.getElementById('subgenero_Id');
    const tipo_Serie = document.getElementById('tipo_Serie');
    const edad_Recomendada = document.getElementById('edad_Recomendada');
    const icono_Historia = document.getElementById('icono_Historia');
    const previewIcono = document.getElementById('preview_icono');
    let cropperIcono = null;

    icono_Historia.addEventListener('change', (e) => {

        const file = e.target.files[0];
        if (!file) {
            return;
        };

        const readerFile = new FileReader();

        readerFile.onload = (e) => {

            previewIcono.innerHTML = `<img id="img_crop_icono" src="${e.target.result}" style="max-width:120px;">`;
            const img = document.getElementById('img_crop_icono');

            if (cropperIcono) {
                cropperIcono.destroy();
            };

            cropperIcono = new Cropper(img, {
                aspectRatio: 1,
                viewMode: 3,
                autoCropArea: 1,
                cropBoxResizable: false
            });
        };

        readerFile.readAsDataURL(file);
    });

    // Obtener token (como en login, perfil, etc)
    const { accessToken } = getData();

    // Cargar géneros
    const responseGeneros = await fetch('http://localhost:3000/api/generos');
    const { data: generos } = await responseGeneros.json();
    genero_Id.innerHTML = '';
    generos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero.id;
        option.textContent = genero.nombre;
        genero_Id.appendChild(option);
    });

    // Cargar subgéneros (puedes filtrar por género si lo deseas)
    subgenero_Id.innerHTML = '';
    generos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero.id;
        option.textContent = genero.nombre;
        subgenero_Id.appendChild(option);
    });

    // Cargar estados de serie
    const responseEstados = await fetch('http://localhost:3000/api/tipo-estado');
    const { data: estados } = await responseEstados.json();
    tipo_Serie.innerHTML = '';
    estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.id;
        option.textContent = estado.nombre_Estado;
        if (estado.id === 1) option.selected = true; // Por defecto 'en publicacion'
        tipo_Serie.appendChild(option);
    });

    // Cargar edades recomendadas
    const responseEdades = await fetch('http://localhost:3000/api/edad-recomendada');
    const { data: edades } = await responseEdades.json();
    edad_Recomendada.innerHTML = '';
    edades.forEach(edad => {
        const option = document.createElement('option');
        option.value = edad.id;
        option.textContent = `${edad.tipo_Recomendacion} ( + ${edad.edad_Minima} )`;
        edad_Recomendada.appendChild(option);
    });

    // Cargar tipos de historia
    const responseTipos = await fetch('http://localhost:3000/api/tipo-historia');
    const { data: tipos } = await responseTipos.json();
    tipo_Historia.innerHTML = '';
    tipos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.id;
        option.textContent = tipo.nombre_tipo;
        tipo_Historia.appendChild(option);
    });

    // Evento para enviar el formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        try {
            const res = await fetch('http://localhost:3000/api/historias', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: formData
            });
            const result = await res.json();
            if (result.success) {
                Swal.fire('¡Listo!', 'Historia creada correctamente', 'success');
                form.reset();
            } else {
                Swal.fire('Error', result.message || 'No se pudo crear la historia', 'error');
            }
        } catch (err) {
            Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
        }
    });
};