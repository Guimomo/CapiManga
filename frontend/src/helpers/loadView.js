export const loadView = async (elemento, hash) => {

    //const hash = location.hash.slice(1); //eliminar el # de la url

    const response = await fetch(`./src/views/${hash}`);
    const html = await response.text();

    elemento.innerHTML= html;

}