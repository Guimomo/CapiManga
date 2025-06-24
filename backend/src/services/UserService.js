import Usuario from "../models/Usuario.js";

class UserService { 

  static async getUsers()
  { 
    try {
      const usuarioInstance = new Usuario();
      const usuarios = await usuarioInstance.getAll();
      // Validamos si no hay usuarios    
      if (usuarios.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay usuarios registrados",
        };
      }      
      // Retornamos los usuarios obtenidos
      return {
        error: false,
        code: 200,
        message: "Usuarios obtenidos correctamente",
        data: categorias,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener los usuarios",
      };
    }
  }

  static async getUserById(id) {
    try {
      const usuarioInstance = new Usuario();
      const usuario = await usuarioInstance.getById(id);
      // Validamos si no se encontró el usuario
      if (!usuario || usuario.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };
      }
      // Consultamos las seies asociadas a el usuario
      const series = await usuarioInstance.series(id);
      // Agregamos la propiedad series al objeto usuario
      usuario.series = series;
      // Retornamos el usuario obtenido
      return {
        error: false,
        code: 200,
        message: "Usuario obtenido correctamente",
        data: categoria,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el usuario",
      };
    }
  }

  // static async createUser(data) {
  //   try {
  //     const usuarioInstance = new Usuario();
  //     const usuario = await usuarioInstance.create(
  //       data.nombre,
  //       data.user_Name,
  //       data.mail,
  //       data.contrasena,
  //       data.telefono,
  //       data.tipo_usuario
  //     );
  //     // Validamos si no se pudo crear el usuario 
  //     if (usuario === null) {
  //       return {
  //         error: true,
  //         code: 400,
  //         message: "Error al crear el usuario",
  //       };
  //     }   
  //     // Retornamos el nuevo usuario creado
  //     return {
  //       error: false,
  //       code: 201,
  //       message: "Usuario creado correctamente",
  //       data: categoria,
  //     };
  //   } catch (error) {
  //     return {
  //       error: true,
  //       code: 500,
  //       message: "Error interno al crear el usuario",
  //     };
  //   }
  // }

  static async updateUser(id, campos) { 
    try {
      const usuarioInstance = new Usuario();
      // Consultamos el usuario por id
      const usuarioExistente = await usuarioInstance.getById(id);
      // Validamos si no existe el usuario
      if (!usuarioExistente || usuarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };
      }
      const usuario = await usuarioInstance.update(id, campos); 
      // Validamos si no se pudo actualizar el usuario
      if (usuario === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el usuario",
        };
      }      
      // Retornamos el usuario actualizado
      return {
        error: false,
        code: 200,
        message: "Usuario actualizado correctamente",
        data: categoria,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el usuario",
      };
    } 
  }

  static async deleteUser(id) { 
    try {
      const usuarioInstance = new Usuario();
      // Consultamos el usuario por id
      const usuarioExistente = await usuarioInstance.getById(id);
      // Validamos si no existe el usuario
      if (!usuarioExistente || usuarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };
      }
      // Consultamos los productos asociados a el usuario
      //const productos = await categoriaInstance.productos(id);
      // Validamos si la categoría tiene productos asociados
      // if (productos.length > 0) {
      //   return {
      //     error: true,
      //     code: 400,
      //     message: "No se puede eliminar la categoría, tiene productos asociados",
      //   };
      // }

      // Procedemos a eliminar la categoría      
      const resultado = await usuarioInstance.delete(id); 
      // Validamos si no se pudo eliminar la categoría
      if (resultado.error) {
        return {
          error: true,
          code: 400,
          message: resultado.mensaje,
        };
      }      
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Usuario eliminado correctamente",
        data: usuarioExistente,
      };
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el usuario",
      };
    }
  }

}

export default UserService;