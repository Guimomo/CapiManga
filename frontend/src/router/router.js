import { Autenticado } from "../helpers/auth.js";
import { loadView } from "../helpers/loadView";
import { configuracionController } from "../views/configuracion/controllers/configuracionController.js";
import { inicioController } from "../views/inicio/controllers/inicioController.js";
import { loginController } from "../views/login/controllers/loginController.js";
import { miHistoriaController } from "../views/mi_Historia/controllers/miHistoriaController.js";
import { miPerfilController } from "../views/mi_perfil/controllers/miPerfilControllers.js";
import { registroCotroller } from "../views/registro/controllers/registroController.js";
import { subirCapituloController } from "../views/subir_Capitulo/controllers/subirCapituloControllers.js";
import { subirHistoriaController } from "../views/subir_Historia/controllers/subirHistoriaControllers.js";

const routes = {

    "":{
        "template": "inicio/index.html",
        controlador: inicioController,
        private: false,
    },

    login: {
        "template": "login/login.html",
        controlador: loginController,
        private: false,
    },

    register: {
        "template": "registro/registro.html",
        controlador: registroCotroller,
        private: false,
    },

    mi_perfil: {
        "template": "mi_perfil/index.html",
        controlador: miPerfilController,
        private: true,
    },

    configuracion: {
        "template": "configuracion/index.html",
        controlador: configuracionController,
        private: true,
    },

    crear_historia: {
        "template": "subir_Historia/index.html",
        controlador: subirHistoriaController,
        private: true,
    },

    "subir_capitulo/:historiaId": { // historiaId es un parametro dinamico
        "template": "subir_Capitulo/index.html",
        controlador: subirCapituloController,
        private: true,
    },

    "mi_historia/:historiaId": {
        "template": "mi_Historia/index.html",
        controlador: miHistoriaController,
        private: true,
    }
}

export const router = async (app) => {

    const hash = location.hash.slice(1); //eliminar el # de la url
    const [rutas, params] = matchRoute(hash); //comprobar si la ruta existe //antes era {template, controlador} y funcionaba con {...routes[route], params}
    console.log(rutas.private);

    if (rutas.private && !Autenticado()) {
    
      cargarView(app, "login/login.html"); // Redirigir a la vista de login si no está autenticado
      loginController(); // Ejecutar el controlador de login
      return; // Salir de la función para evitar cargar la vista privada
    }
    
    //llamando la vista
    await loadView(app, rutas.template); //cargar la vista por defecto al cargar la pagina

    // Ejecutar el controlador
    rutas.controlador(params); // Ejecutar el controlador después de cargar la vista
}

const matchRoute = (hash) => { 

    const arreglo = hash.split('/') ;  

  for (const route in routes) {
    const b = route.split('/') ;    
    
    if (b.length !== arreglo.length) continue
    
    const params = {}

    const matched = b.every( (parte, i) => {    

      if (parte.startsWith(":")) {  

        const partName = parte.slice(1);
        const value = arreglo[i];
        params[partName] = value;
        return true
      }

      if (parte === arreglo[i]){
        return true
      }

    });


    if (matched === true) {

      return [routes[route], params]; // Retornar la ruta y los params // antes era {...routes[route], params}
    }

    console.log(params);
    
    

    if (route === hash) {

      return routes[route];
    }
  }
  
    return [null, null]
}