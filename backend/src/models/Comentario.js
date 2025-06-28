import connection from "../utils/db.js";

class Comentario {
  async getAllByObjetivo(tipo_objetivo, id_objetivo) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM Comentario WHERE tipo_objetivo = ? AND id_objetivo = ? ORDER BY fecha_Comentario DESC",
        [tipo_objetivo, id_objetivo]
      );
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los comentarios");
    }
  }

  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM Comentario WHERE id = ?",
        [id]
      );
      if (rows.length === 0) return [];
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el comentario");
    }
  }

  async create({ id_Usuario, contenido, tipo_objetivo, id_objetivo }) {
    try {
      const [result] = await connection.query(
        "INSERT INTO Comentario (id_Usuario, contenido, tipo_objetivo, id_objetivo) VALUES (?, ?, ?, ?)",
        [id_Usuario, contenido, tipo_objetivo, id_objetivo]
      );
      if (result.affectedRows === 0) return null;
      return { id: result.insertId, id_Usuario, contenido, tipo_objetivo, id_objetivo };
    } catch (error) {
      throw new Error("Error al crear el comentario");
    }
  }

  async update(id, id_Usuario, contenido) {
    try {
      const [result] = await connection.query(
        "UPDATE Comentario SET contenido = ? WHERE id = ? AND id_Usuario = ?",
        [contenido, id, id_Usuario]
      );
      return result.affectedRows > 0 ? { id, contenido } : null;
    } catch (error) {
      throw new Error("Error al actualizar el comentario");
    }
  }

  async delete(id, id_Usuario) {
    try {
      const [result] = await connection.query(
        "DELETE FROM Comentario WHERE id = ? AND id_Usuario = ?",
        [id, id_Usuario]
      );
      if (result.affectedRows === 0) {
        return {
          error: true,
          mensaje: "No se pudo eliminar el comentario, ocurrió un error inesperado.",
        };
      }
      return {
        error: false,
        mensaje: "Comentario eliminado exitosamente.",
      };
    } catch (error) {
      throw new Error("Error al eliminar el comentario");
    }
  }
}

export default Comentario;
