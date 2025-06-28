import connection from "../utils/db.js";

class Reaccion {
  async getAllByObjetivo(tipo_objetivo, id_objetivo) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM Reaccion WHERE tipo_objetivo = ? AND id_objetivo = ? ORDER BY fecha_Reaccion DESC",
        [tipo_objetivo, id_objetivo]
      );
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las reacciones");
    }
  }

  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM Reaccion WHERE id = ?",
        [id]
      );
      if (rows.length === 0) return [];
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener la reacción");
    }
  }

  async create({ id_Usuario, tipo_objetivo, id_objetivo, tipo_Reaccion }) {
    try {
      // Si ya existe, actualiza el tipo_Reaccion
      const [existing] = await connection.query(
        "SELECT id FROM Reaccion WHERE id_Usuario = ? AND tipo_objetivo = ? AND id_objetivo = ?",
        [id_Usuario, tipo_objetivo, id_objetivo]
      );
      if (existing.length > 0) {
        const [result] = await connection.query(
          "UPDATE Reaccion SET tipo_Reaccion = ? WHERE id_Usuario = ? AND tipo_objetivo = ? AND id_objetivo = ?",
          [tipo_Reaccion, id_Usuario, tipo_objetivo, id_objetivo]
        );
        return result.affectedRows > 0 ? { id: existing[0].id, id_Usuario, tipo_objetivo, id_objetivo, tipo_Reaccion } : null;
      } else {
        const [result] = await connection.query(
          "INSERT INTO Reaccion (id_Usuario, tipo_objetivo, id_objetivo, tipo_Reaccion) VALUES (?, ?, ?, ?)",
          [id_Usuario, tipo_objetivo, id_objetivo, tipo_Reaccion]
        );
        if (result.affectedRows === 0) return null;
        return { id: result.insertId, id_Usuario, tipo_objetivo, id_objetivo, tipo_Reaccion };
      }
    } catch (error) {
      throw new Error("Error al crear o actualizar la reacción");
    }
  }

  async delete(id, id_Usuario) {
    try {
      const [result] = await connection.query(
        "DELETE FROM Reaccion WHERE id = ? AND id_Usuario = ?",
        [id, id_Usuario]
      );
      if (result.affectedRows === 0) {
        return {
          error: true,
          mensaje: "No se pudo eliminar la reacción, ocurrió un error inesperado.",
        };
      }
      return {
        error: false,
        mensaje: "Reacción eliminada exitosamente.",
      };
    } catch (error) {
      throw new Error("Error al eliminar la reacción");
    }
  }
}

export default Reaccion;
