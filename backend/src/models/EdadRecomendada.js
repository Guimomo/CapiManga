import connection from "../utils/db.js";

class EdadRecomendada {
  // Obtener todas las edades recomendadas
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM edad_Recomendada");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las edades recomendadas");
    }
  }

  // Obtener una edad recomendada por id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM edad_Recomendada WHERE id = ?", [id]);
      if (rows.length === 0) return [];
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener la edad recomendada");
    }
  }

  // Crear una nueva edad recomendada
  async create(tipo_Recomendacion, edad_Minima, edad_Maxima) {
    try {
      const [result] = await connection.query(
        "INSERT INTO edad_Recomendada (tipo_Recomendacion, edad_Minima, edad_Maxima) VALUES (?, ?, ?)",
        [tipo_Recomendacion, edad_Minima, edad_Maxima]
      );
      if (result.affectedRows === 0) return null;
      return { id: result.insertId, tipo_Recomendacion, edad_Minima, edad_Maxima };
    } catch (error) {
      throw new Error("Error al crear la edad recomendada");
    }
  }

  // Actualizar una edad recomendada
  async update(id, campos) {
    try {
      let query = "UPDATE edad_Recomendada SET ";
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
      throw new Error("Error al actualizar la edad recomendada");
    }
  }

  // Eliminar una edad recomendada
  async delete(edadId) {
    const [result] = await connection.query(
      "DELETE FROM edad_Recomendada WHERE id = ?",
      [edadId]
    );
    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar la edad recomendada, ocurrió un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Edad recomendada eliminada exitosamente.",
    };
  }
}

export default EdadRecomendada;
