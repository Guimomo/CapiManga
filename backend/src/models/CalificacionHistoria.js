import connection from "../utils/db.js";

class CalificacionHistoria {
  // Obtener todas las calificaciones
  async getAll() {
    const [rows] = await connection.query("SELECT * FROM calificacion_Historia");
    return rows;
  }

  // Obtener una calificación por id compuesto
  async getById(id_Historia, calificada_por) {
    const [rows] = await connection.query(
      "SELECT * FROM calificacion_Historia WHERE id_Historia = ? AND calificada_por = ?",
      [id_Historia, calificada_por]
    );
    if (rows.length === 0) return [];
    return rows[0];
  }

  // Crear una nueva calificación
  async create({ id_Historia, calificada_por, calificacion, resena_Historia }) {
    const [result] = await connection.query(
      "INSERT INTO calificacion_Historia (id_Historia, calificada_por, calificacion, resena_Historia) VALUES (?, ?, ?, ?)",
      [id_Historia, calificada_por, calificacion, resena_Historia || null]
    );
    if (result.affectedRows === 0) return null;
    return { id_Historia, calificada_por, calificacion, resena_Historia };
  }

  // Actualizar una calificación
  async update(id_Historia, calificada_por, campos) {
    let query = "UPDATE calificacion_Historia SET ";
    let params = [];
    for (const [key, value] of Object.entries(campos)) {
      query += `${key} = ?, `;
      params.push(value);
    }
    query = query.slice(0, -2);
    query += " WHERE id_Historia = ? AND calificada_por = ?";
    params.push(id_Historia, calificada_por);
    const [result] = await connection.query(query, params);
    return result.affectedRows > 0 ? { id_Historia, calificada_por, ...campos } : null;
  }

  // Eliminar una calificación
  async delete(id_Historia, calificada_por) {
    const [result] = await connection.query(
      "DELETE FROM calificacion_Historia WHERE id_Historia = ? AND calificada_por = ?",
      [id_Historia, calificada_por]
    );
    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar la calificación, ocurrió un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Calificación eliminada exitosamente.",
    };
  }
}

export default CalificacionHistoria;
