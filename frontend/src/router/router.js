import { loadView } from "../helpers/loadView";
import { inicioController } from "../views/inicio/controllers/inicioController";
import { loginController } from "../views/log/controllers/loginController";
import { registroCotroller } from "../views/log/controllers/registroController";

const routes = {

    "":{
        "template": "inicio/index.html",
        controlador: inicioController,
        private: false,
    },

    login: {
        "template": "log/login.html",
        controlador: loginController,
        private: false,
    },

    register: {
        "template": "log/registro.html",
        controlador: registroCotroller,
        private: false,
    },


}

export const router = async (app) => {

    const hash = location.hash.slice(1); //eliminar el # de la url
    const [rutas, params] = matchRoute(hash); //comprobar si la ruta existe //antes era {template, controlador} y funcionaba con {...routes[route], params}
    console.log(params);
    
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