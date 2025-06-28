import connection from "../utils/db.js";

class PaginasCapitulo {
  // Obtener todas las páginas
  async getAll() {
    const [rows] = await connection.query("SELECT * FROM Paginas_Capitulo");
    return rows;
  }

  // Obtener una página por id
  async getById(id) {
    const [rows] = await connection.query("SELECT * FROM Paginas_Capitulo WHERE id = ?", [id]);
    if (rows.length === 0) return [];
    return rows[0];
  }

  // Crear una nueva página
  async create({ id_Capitulo, pagina_img, pagina_numero }) {
    const [result] = await connection.query(
      "INSERT INTO Paginas_Capitulo (id_Capitulo, pagina_img, pagina_numero) VALUES (?, ?, ?)",
      [id_Capitulo, pagina_img, pagina_numero]
    );
    if (result.affectedRows === 0) return null;
    return { id: result.insertId, id_Capitulo, pagina_img, pagina_numero };
  }

  // Actualizar una página
  async update(id, campos) {
    let query = "UPDATE Paginas_Capitulo SET ";
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

  // Eliminar una página
  async delete(paginaId) {
    const [result] = await connection.query(
      "DELETE FROM Paginas_Capitulo WHERE id = ?",
      [paginaId]
    );
    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar la página, ocurrió un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Página eliminada exitosamente.",
    };
  }
}

export default PaginasCapitulo;
