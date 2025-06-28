import connection from "../utils/db.js";

class Notificacion {
    
  async getAllByUsuario(id_Usuario) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM notificaciones WHERE id_Usuario = ? ORDER BY fecha_Notificacion DESC",
        [id_Usuario]
      );
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las notificaciones");
    }
  }

  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM notificaciones WHERE id = ?",
        [id]
      );
      if (rows.length === 0) return [];
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener la notificación");
    }
  }

  async create({ id_Usuario, mensaje }) {
    try {
      const [result] = await connection.query(
        "INSERT INTO notificaciones (id_Usuario, mensaje) VALUES (?, ?)",
        [id_Usuario, mensaje]
      );
      if (result.affectedRows === 0) return null;
      return { id: result.insertId, id_Usuario, mensaje, leida: false };
    } catch (error) {
      throw new Error("Error al crear la notificación");
    }
  }

  async updateLeida(id, id_Usuario) {
    try {
      const [result] = await connection.query(
        "UPDATE notificaciones SET leida = true WHERE id = ? AND id_Usuario = ?",
        [id, id_Usuario]
      );
      return result.affectedRows > 0 ? { id, leida: true } : null;
    } catch (error) {
      throw new Error("Error al marcar la notificación como leída");
    }
  }

  async delete(id, id_Usuario) {
    try {
      const [result] = await connection.query(
        "DELETE FROM notificaciones WHERE id = ? AND id_Usuario = ?",
        [id, id_Usuario]
      );
      if (result.affectedRows === 0) {
        return {
          error: true,
          mensaje: "No se pudo eliminar la notificación, ocurrió un error inesperado.",
        };
      }
      return {
        error: false,
        mensaje: "Notificación eliminada exitosamente.",
      };
    } catch (error) {
      throw new Error("Error al eliminar la notificación");
    }
  }
}

export default Notificacion;
