import connection from "../utils/db.js";

class EstadoSerie {
  // Obtener todos los estados de serie
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM Estado_Serie");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los estados de serie");
    }
  }

  // Obtener un estado de serie por id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM Estado_Serie WHERE id = ?", [id]);
      if (rows.length === 0) return {};
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el estado de serie");
    }
  }

  // Crear un nuevo estado de serie
  async create(nombre_estado) {
    try {
      const [result] = await connection.query(
        "INSERT INTO Estado_Serie (nombre_estado) VALUES (?)",
        [nombre_estado]
      );
      if (result.affectedRows === 0) return null;
      return { id: result.insertId, nombre_estado };
    } catch (error) {
      throw new Error("Error al crear el estado de serie");
    }
  }

  // Actualizar un estado de serie
  async update(id, campos) {
    try {
      let query = "UPDATE Estado_Serie SET ";
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
      throw new Error("Error al actualizar el estado de serie");
    }
  }

  // Eliminar un estado de serie
  async delete(id) {
    try {
      const [result] = await connection.query(
        "DELETE FROM Estado_Serie WHERE id = ?",
        [id]
      );
      return result;
    } catch (error) {
      throw new Error("Error al eliminar el estado de serie");
    }
  }
}

export default EstadoSerie;
