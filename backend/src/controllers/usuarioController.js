import { ResponseProvider } from "../providers/ResponseProvider.js";
import UserService from "../services/UserService.js";

class UsuarioController {

  // Obtener todas los usuarios
  static getAllUsuarios = async (req, res) => {    
    try {
      // Llamamos al servicio para obtener los usuarios
      const response = await UserService.getCategories();   
      // Validamos si no hay usuarios
      if (response.error) {        
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta        
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
       }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Obtener un usuario por su ID
  static getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el usuario por su ID
      const response = await UserService.getUserById(id);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {        
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Crear un nuevo usuario
  // static createUsuario = async (req, res) => {
  //   const { nombre, user_Name, mail, contrasena, telefono, tipo_usuario } = req.body;
  //   try {
  //     const response = await CategoryService.createCategory(
  //       { nombre,
  //         user_Name,
  //         mail,
  //         contrasena,
  //         telefono,
  //         tipo_usuario,}
  //     );

  //     if (response.error) {
  //       // Llamamos el provider para centralizar los mensajes de respuesta
  //       return ResponseProvider.error(
  //         res,
  //         response.message,
  //         response.code
  //       );
  //     } else {
  //       // Llamamos el provider para centralizar los mensajes de respuesta
  //       return ResponseProvider.success(
  //         res,
  //         response.data,
  //         response.message,
  //         response.code
  //       );
  //     }
  //   } catch (error) {
  //     // Llamamos el provider para centralizar los mensajes de respuesta
  //     ResponseProvider.error(res, "Error al interno en el servidor", 500);
  //   }
  // };

  // Actualizar un usuario
  static updateUsuario = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase Categoria
      const categoria = await UserService.updateUser(id, campos);
      // Validamos si no se pudo actualizar la categoría
      if (categoria.error) {
        ResponseProvider.error(
          res,
          categoria.message,
          categoria.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        categoria.data,
        categoria.message,
        categoria.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar un usuario
  static deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el usuario
      const response = await UserService.deleteUser(id);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

}
export default UsuarioController;
