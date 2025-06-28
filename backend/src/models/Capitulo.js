import connection from "../utils/db.js";

class Capitulo {
  // Obtener todos los capítulos
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM Capitulo");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los capítulos");
    }
  }

  // Obtener un capítulo por id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM Capitulo WHERE id = ?", [id]);
      if (rows.length === 0) return [];
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el capítulo");
    }
  }

  // Obtener capítulos por historia
  async getByHistoria(id_Historia) {
    try {
      const [rows] = await connection.query("SELECT * FROM Capitulo WHERE id_Historia = ?", [id_Historia]);
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los capítulos de la historia");
    }
  }

  // Crear un nuevo capítulo
  async create(data) {
    try {
      const campos = [
        "id_Historia", "titulo_Capitulo", "numero_Capitulo", "argumento_Capitulo", "icono_Capitulo"
      ];
      const values = campos.map(c => data[c]);
      const [result] = await connection.query(
        `INSERT INTO Capitulo (${campos.join(",")}) VALUES (${campos.map(() => "?").join(",")})`,
        values
      );
      if (result.affectedRows === 0) return null;
      return { id: result.insertId, ...data };
    } catch (error) {
      throw new Error("Error al crear el capítulo");
    }
  }

  // Actualizar un capítulo
  async update(id, campos) {
    try {
      let query = "UPDATE Capitulo SET ";
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
      throw new Error("Error al actualizar el capítulo");
    }
  }

  // Eliminar un capítulo
  async delete(capituloId) {
    const [result] = await connection.query(
      "DELETE FROM Capitulo WHERE id = ?",
      [capituloId]
    );
    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el capítulo, ocurrió un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Capítulo eliminado exitosamente.",
    };
  }
}

export default Capitulo;
