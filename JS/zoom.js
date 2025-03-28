// const getZoomLevel = () => {
//     return Math.round((window.devicePixelRatio || 1) * 100);
// };

// const preventExtremeZoom = (event) => {
//     const zoomLevel = getZoomLevel();

//     if (zoomLevel < 70 || zoomLevel > 120) {
//         event.preventDefault();
//     }
// };

// // Detectar zoom con scroll (Ctrl + Rueda del mouse)
// window.addEventListener("wheel", (event) => {
//     if (event.ctrlKey) preventExtremeZoom(event);
// }, { passive: false });

// // Detectar zoom con atajos de teclado (Ctrl + "+" o Ctrl + "-")
// window.addEventListener("keydown", (event) => {
//     if ((event.ctrlKey || event.metaKey) && 
//         (event.key === "+" || event.key === "-" || event.key === "0")) {
//         preventExtremeZoom(event);
//     }
// });

// // Monitorear cambios de zoom dinámicamente
// window.addEventListener("resize", () => {
//     const zoomLevel = getZoomLevel();
//     console.log("Zoom actual:", zoomLevel + "%");
// });




// const checkZoom = () => {
//     const zoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);

//     if (zoomLevel < 70) {
//         document.body.style.zoom = "70%";
//     } else if (zoomLevel > 120) {
//         document.body.style.zoom = "120%";
//     } else {
//         document.body.style.zoom = "";
//     }
// };

// // Ejecutar al cargar la página
// checkZoom();

// // Detectar cambios de zoom
// window.addEventListener("resize", () => checkZoom());