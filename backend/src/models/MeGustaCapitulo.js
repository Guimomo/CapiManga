import connection from "../utils/db.js";

class MeGustaCapitulo {
  async getAllByCapitulo(id_Capitulo) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM MeGusta_Capitulo WHERE id_Capitulo = ? ORDER BY fecha_MeGusta DESC",
        [id_Capitulo]
      );
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los me gusta del capítulo");
    }
  }

  async getById(id_Capitulo, id_Usuario) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM MeGusta_Capitulo WHERE id_Capitulo = ? AND id_Usuario = ?",
        [id_Capitulo, id_Usuario]
      );
      if (rows.length === 0) return [];
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el me gusta");
    }
  }

  async create({ id_Capitulo, id_Usuario }) {
    try {
      const [existing] = await connection.query(
        "SELECT * FROM MeGusta_Capitulo WHERE id_Capitulo = ? AND id_Usuario = ?",
        [id_Capitulo, id_Usuario]
      );
      if (existing.length > 0) {
        return null;
      }
      const [result] = await connection.query(
        "INSERT INTO MeGusta_Capitulo (id_Capitulo, id_Usuario) VALUES (?, ?)",
        [id_Capitulo, id_Usuario]
      );
      if (result.affectedRows === 0) return null;
      return { id_Capitulo, id_Usuario };
    } catch (error) {
      throw new Error("Error al dar me gusta al capítulo");
    }
  }

  async delete(id_Capitulo, id_Usuario) {
    try {
      const [result] = await connection.query(
        "DELETE FROM MeGusta_Capitulo WHERE id_Capitulo = ? AND id_Usuario = ?",
        [id_Capitulo, id_Usuario]
      );
      if (result.affectedRows === 0) {
        return {
          error: true,
          mensaje: "No se pudo eliminar el me gusta, ocurrió un error inesperado.",
        };
      }
      return {
        error: false,
        mensaje: "Me gusta eliminado exitosamente.",
      };
    } catch (error) {
      throw new Error("Error al eliminar el me gusta");
    }
  }
}

export default MeGustaCapitulo;
