import connection from "../utils/db.js";

class GuardarHistoria {
  // Obtener todos los guardados de una historia por su id
  async getByHistoriaId(id_Historia) {
    const [rows] = await connection.query(
      "SELECT * FROM guardar_Historia WHERE id_Historia = ?",
      [id_Historia]
    );
    return rows;
  }
  // Obtener todos los guardados
  async getAll() {
    const [rows] = await connection.query("SELECT * FROM guardar_Historia");
    return rows;
  }

  // Obtener un guardado por id compuesto
  async getById(id_Historia, guardada_por) {
    const [rows] = await connection.query(
      "SELECT * FROM guardar_Historia WHERE id_Historia = ? AND guardada_por = ?",
      [id_Historia, guardada_por]
    );
    if (rows.length === 0) return [];
    return rows[0];
  }

  // Crear un nuevo guardado
  async create({ id_Historia, guardada_por, fecha_Guardado }) {
    const [result] = await connection.query(
      "INSERT INTO guardar_Historia (id_Historia, guardada_por, fecha_Guardado) VALUES (?, ?, ?)",
      [id_Historia, guardada_por, fecha_Guardado || null]
    );
    if (result.affectedRows === 0) return null;
    return { id_Historia, guardada_por, fecha_Guardado };
  }

  // Actualizar un guardado
  async update(id_Historia, guardada_por, campos) {
    let query = "UPDATE guardar_Historia SET ";
    let params = [];
    for (const [key, value] of Object.entries(campos)) {
      query += `${key} = ?, `;
      params.push(value);
    }
    query = query.slice(0, -2);
    query += " WHERE id_Historia = ? AND guardada_por = ?";
    params.push(id_Historia, guardada_por);
    const [result] = await connection.query(query, params);
    return result.affectedRows > 0 ? { id_Historia, guardada_por, ...campos } : null;
  }

  // Eliminar un guardado
  async delete(id_Historia, guardada_por) {
    const [result] = await connection.query(
      "DELETE FROM guardar_Historia WHERE id_Historia = ? AND guardada_por = ?",
      [id_Historia, guardada_por]
    );
    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el guardado, ocurrió un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Guardado eliminado exitosamente.",
    };
  }
}

export default GuardarHistoria;
