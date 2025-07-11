import connection from "../utils/db.js";

class Historia {
  // Obtener todas las historias
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM Historia");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las historias");
    }
  }

  // Obtener una historia por id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM Historia WHERE id = ?", [id]);
      if (rows.length === 0) return [];
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener la historia");
    }
  }

  async getHistoriaByAutor (autorId) {

    try {
      const [rows] = await connection.query("SELECT * FROM Historia WHERE autor_Historia = ?", [autorId]);
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las historias del autor");
    }
  }

  // Crear una nueva historia
  async create(data) {
    try {
      const campos = [
        "autor_Historia", "titulo_Historia", "formato_Publicacion", "portada_Historia", "icono_Historia", "logo_Historia", "banner_Historia", "personaje_Png", "genero_Id", "subgenero_Id", "argumento_Historia", "tipo_Serie", "edad_Recomendada", "visibilidad_Historia", "tipo_Historia", "verificación_Historia"
      ];
      const values = campos.map(c => data[c]);
      const [result] = await connection.query(
        `INSERT INTO Historia (${campos.join(",")}) VALUES (${campos.map(() => "?").join(",")})`,
        values
      );
      if (result.affectedRows === 0) return null;
      return { id: result.insertId, ...data };
    } catch (error) {
      throw new Error("Error al crear la historia");
    }
  }

  // Actualizar una historia
  async update(id, campos) {
    try {
      let query = "UPDATE Historia SET ";
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
      throw new Error("Error al actualizar la historia");
    }
  }

  // Eliminar una historia
  async delete(historiaId) {
    // Verificar si la historia tiene capítulos asociados
    const [capitulos] = await connection.query(
      "SELECT id FROM Capitulo WHERE id_Historia = ?",
      [historiaId]
    );
    if (capitulos.length > 0) {
      return {
        error: true,
        mensaje: "No se puede eliminar la historia porque tiene capítulos asociados.",
      };
    }
    // Si no tiene capítulos, proceder a eliminar
    const [result] = await connection.query(
      "DELETE FROM Historia WHERE id = ?",
      [historiaId]
    );
    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar la historia, ocurrió un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Historia eliminada exitosamente.",
    };
  }
}

export default Historia;
