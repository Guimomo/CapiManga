import connection from "../utils/db.js";

class SeguirUsuario {
  // Obtener todos los seguimientos
  async getAll() {
    const [rows] = await connection.query("SELECT * FROM seguir_Usuario");
    return rows;
  }

  // Obtener un seguimiento por id compuesto
  async getById(siguiendo_a, seguido_por) {
    const [rows] = await connection.query(
      "SELECT * FROM seguir_Usuario WHERE siguiendo_a = ? AND seguido_por = ?",
      [siguiendo_a, seguido_por]
    );
    if (rows.length === 0) return [];
    return rows[0];
  }

  // Crear un nuevo seguimiento
  async create({ siguiendo_a, seguido_por, seguimiento_fecha }) {
    const [result] = await connection.query(
      "INSERT INTO seguir_Usuario (siguiendo_a, seguido_por, seguimiento_fecha) VALUES (?, ?, ?)",
      [siguiendo_a, seguido_por, seguimiento_fecha || null]
    );
    if (result.affectedRows === 0) return null;
    return { siguiendo_a, seguido_por, seguimiento_fecha };
  }

  // Actualizar un seguimiento
  async update(siguiendo_a, seguido_por, campos) {
    let query = "UPDATE seguir_Usuario SET ";
    let params = [];
    for (const [key, value] of Object.entries(campos)) {
      query += `${key} = ?, `;
      params.push(value);
    }
    query = query.slice(0, -2);
    query += " WHERE siguiendo_a = ? AND seguido_por = ?";
    params.push(siguiendo_a, seguido_por);
    const [result] = await connection.query(query, params);
    return result.affectedRows > 0 ? { siguiendo_a, seguido_por, ...campos } : null;
  }

  // Eliminar un seguimiento
  async delete(siguiendo_a, seguido_por) {
    const [result] = await connection.query(
      "DELETE FROM seguir_Usuario WHERE siguiendo_a = ? AND seguido_por = ?",
      [siguiendo_a, seguido_por]
    );
    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el seguimiento, ocurrió un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Seguimiento eliminado exitosamente.",
    };
  }
}

export default SeguirUsuario;
