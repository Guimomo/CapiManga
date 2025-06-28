import connection from "../utils/db.js";

class TipoHistoria {
  // Obtener todos los tipos de historia
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM tipo_historia");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los tipos de historia");
    }
  }

  // Obtener un tipo de historia por id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM tipo_historia WHERE id = ?", [id]);
      if (rows.length === 0) return [];
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el tipo de historia");
    }
  }

  // Crear un nuevo tipo de historia
  async create(nombre_tipo) {
    try {
      const [result] = await connection.query(
        "INSERT INTO tipo_historia (nombre_tipo) VALUES (?)",
        [nombre_tipo]
      );
      if (result.affectedRows === 0) return null;
      return { id: result.insertId, nombre_tipo };
    } catch (error) {
      throw new Error("Error al crear el tipo de historia");
    }
  }

  // Actualizar un tipo de historia
  async update(id, campos) {
    try {
      let query = "UPDATE tipo_historia SET ";
      let params = [];
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }
      query = query.slice(0, -2);
      query += " WHERE id = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar el tipo de historia");
    }
  }

  // Eliminar un tipo de historia
  async delete(tipoHistoriaId) {
    const [result] = await connection.query(
      "DELETE FROM tipo_historia WHERE id = ?",
      [tipoHistoriaId]
    );
    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el tipo de historia, ocurrió un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Tipo de historia eliminado exitosamente.",
    };
  }
}

export default TipoHistoria;
