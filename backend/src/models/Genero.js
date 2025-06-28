import connection from "../utils/db.js";

class Genero {
  // Obtener todos los géneros
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM Generos");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los géneros");
    }
  }

  // Obtener un género por id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM Generos WHERE id = ?", [id]);
      if (rows.length === 0) return [];
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el género");
    }
  }

  // Crear un nuevo género
  async create(nombre) {
    try {
      const [result] = await connection.query(
        "INSERT INTO Generos (nombre) VALUES (?)",
        [nombre]
      );
      if (result.affectedRows === 0) return null;
      return { id: result.insertId, nombre };
    } catch (error) {
      throw new Error("Error al crear el género");
    }
  }

  // Actualizar un género
  async update(id, campos) {
    try {
      let query = "UPDATE Generos SET ";
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
      throw new Error("Error al actualizar el género");
    }
  }

  // Eliminar un género
  async delete(generoId) {
    const [result] = await connection.query(
      "DELETE FROM Generos WHERE id = ?",
      [generoId]
    );
    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el género, ocurrió un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Género eliminado exitosamente.",
    };
  }
}

export default Genero;
