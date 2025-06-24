import connection from "../utils/db.js";

class Usuario {
  
  // Método para obtener todos los usuarios
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM Usuario");
      return rows; // Retorna las categorías obtenidas
    } catch (error) {
      throw new Error("Error al obtener los usuarios");
    }
  }

  // Método para obtener un usuario por su ID
  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM Usuario WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el usuario
        return [];
      }
      // Retorna el usuario encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el usuario");
    }
  }

  // Método para crear una nuevo usuario
  // async create(nombre, user_Name, mail, contrasena, telefono, tipo_usuario) {
  //   try {
  //     const [result] = await connection.query(
  //       "INSERT INTO Usuario (nombre, user_Name, mail, contrasena, telefono, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)",
  //       [nombre, user_Name, mail, contrasena, telefono, tipo_usuario]
  //     );
  //     if (result.affectedRows === 0) {
  //       return null; // Retorna null si no se pudo crear el usuario
  //     }
  //     // Retorna el nuevo usuario creado
  //     return { id: result.insertId, nombre, user_Name, mail, telefono, tipo_usuario };
  //   } catch (error) {
  //     throw new Error("Error al crear el usuario");
  //   }
  // }

  // Método para actualizar un usuario
  async update(id, campos) {
    try {
      let query = "UPDATE categorias SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el producto por su ID
      query += " WHERE id = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar el usuario");
    }
  }

  // Método para eliminar un usuario
  async delete(usuarioId) {
    // Procedemos con la eliminación si no está relacionado
    const [result] = await connection.query(
      "DELETE FROM Usuario WHERE id = ?",
      [usuarioId]
    );

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el usuario, ocurrió un error inesperado.",
      };
    }

    return {
      error: false,
      mensaje: "Usuario eliminado exitosamente.",
    };
  }

  // Método para listar las series de un usuario
  async series(usuarioId) {
    const [rows] = await connection.query(
      "SELECT * FROM Series WHERE id_autor = ?",
      [usuarioId]
    );
    return rows; // Retorna las series asociadas al usuario
  }
}

export default Usuario;
