export const es_fechaNacimiento = (event, element) => {
  let elemento = element;
  if (event.type === "blur") {
    elemento = event.target;
  }
  const valor = elemento.value;
  if (!valor) return false;

  const fechaNacimiento = new Date(valor);
  const hoy = new Date();
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const m = hoy.getMonth() - fechaNacimiento.getMonth();
  const d = hoy.getDate() - fechaNacimiento.getDate();
  let edadFinal = edad;
  if (m < 0 || (m === 0 && d < 0)) {
    edadFinal--;
  }

  if (edadFinal < 14) {
    elemento.setCustomValidity("Debes tener al menos 14 años para registrarte.");
    elemento.reportValidity();
    return false;
  } else {
    elemento.setCustomValidity("");
    return true;
  }
};
