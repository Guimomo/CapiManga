import connection from "../utils/db.js";

class TipoEstado {
  // Obtener todos los tipos de estado
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM Tipo_Estado");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los tipos de estado");
    }
  }

  // Obtener un tipo de estado por id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM Tipo_Estado WHERE id = ?", [id]);
      if (rows.length === 0) return [];
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el tipo de estado");
    }
  }

  // Crear un nuevo tipo de estado
  async create(nombre_Estado) {
    try {
      const [result] = await connection.query(
        "INSERT INTO Tipo_Estado (nombre_Estado) VALUES (?)",
        [nombre_Estado]
      );
      if (result.affectedRows === 0) return null;
      return { id: result.insertId, nombre_Estado };
    } catch (error) {
      throw new Error("Error al crear el tipo de estado");
    }
  }

  // Actualizar un tipo de estado
  async update(id, campos) {
    try {
      let query = "UPDATE Tipo_Estado SET ";
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
      throw new Error("Error al actualizar el tipo de estado");
    }
  }

  // Eliminar un tipo de estado
  async delete(tipoEstadoId) {
    const [result] = await connection.query(
      "DELETE FROM Tipo_Estado WHERE id = ?",
      [tipoEstadoId]
    );
    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el tipo de estado, ocurrió un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Tipo de estado eliminado exitosamente.",
    };
  }
}

export default TipoEstado;
