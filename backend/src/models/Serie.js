import connection from "../utils/db.js";

class Serie {
  /**
   * Método para obtener los productos almacenados en la base de datos
   *
   * @returns {QueryResult} Areglo de productos obtenidos de la base de datos
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM Series");
      // Retorna las series obtenidas
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las series");
    }
  }

  /**
   * Método para obtener una serie por su id
   *
   * @param {Number} id Identificador del producto
   * @returns {Object} Objeto producto
   */
  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM Series WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra la serie
        return [];
      }
      // Retorna la serie encontrada
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener las series");
    }
  }

  /**
   * Método para crear una serie
   *
   * @returns {Object} Objeto producto
   */
  async create(titulo, descripcion, id_autor, portada_path, banner_path, tipo_contenido) {
    try {
      const [result] = await connection.query(
        "INSERT INTO Series (titulo, descripcion, id_autor, portada_path, banner_path, tipo_contenido) VALUES (?, ?, ?, ?, ?, ?)",
        [titulo, descripcion, id_autor, portada_path, banner_path, tipo_contenido]
      );
      return {
        id: result.insertId,
        titulo,
        descripcion,
        id_autor,
        portada_path,
        banner_path,
        tipo_contenido,
      };
    } catch (error) {
      throw new Error("Error al crear la serie");
    }
  }

  /**
   * Método para actualizar una serie
   *
   * @param {Number} id Identificador del producto
   * @returns {Object} Objeto producto actualizado
   */
  async update(id, campos) {
    try {
      let query = "UPDATE Series SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el producto por su ID
      query += " WHERE id = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar la serie");
    }
  }

  /**
   * Método para eliminar una serie
   * @param {Number} id identificador del producto
   * @returns {String} Mensaje de respuesta
   */
  async delete(id) {
    try {
      // Procedemos con la eliminación si no está relacionada
      const [result] = await connection.query(
        "DELETE FROM Series WHERE id = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return {
          error: true,
          mensaje: "Serie no encontrado.",
        };
      }
      return {
        error: false,
        mensaje: "Serie eliminado exitosamente.",
      };
    } catch (error) {
      res.status(500).json({
        error: true,
        mensaje: "Error al eliminar la serie.",
      });
    }
  }

  /**
   * Metodo para listar capítulos de una serie
   */

  async capitulos(id_serie) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM Capitulos WHERE id_serie = ?",
        [id_serie]
      );
      return rows; // Retorna los capítulos asociados a la serie
    } catch (error) {
      throw new Error("Error al obtener los capítulos de la serie");
    }
  }
}

export default Serie;
