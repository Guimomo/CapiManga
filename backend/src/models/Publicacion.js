import connection from "../utils/db.js";

class Publicacion {
  // Obtener todas las publicaciones
  async getAll() {
    const [rows] = await connection.query("SELECT * FROM publicacion");
    return rows;
  }

  // Obtener una publicación por id
  async getById(id) {
    const [rows] = await connection.query("SELECT * FROM publicacion WHERE id = ?", [id]);
    if (rows.length === 0) return [];
    return rows[0];
  }

  // Crear una nueva publicación
  async create({ publicado_por, publicacion_Text, publicacion_Img, publicacion_Fecha }) {
    const [result] = await connection.query(
      "INSERT INTO publicacion (publicado_por, publicacion_Text, publicacion_Img, publicacion_Fecha) VALUES (?, ?, ?, ?)",
      [publicado_por, publicacion_Text, publicacion_Img || null, publicacion_Fecha || null]
    );
    if (result.affectedRows === 0) return null;
    return { id: result.insertId, publicado_por, publicacion_Text, publicacion_Img, publicacion_Fecha };
  }

  // Actualizar una publicación
  async update(id, campos) {
    let query = "UPDATE publicacion SET ";
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
  }

  // Eliminar una publicación
  async delete(id) {
    const [result] = await connection.query(
      "DELETE FROM publicacion WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar la publicación, ocurrió un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Publicación eliminada exitosamente.",
    };
  }
}

export default Publicacion;
