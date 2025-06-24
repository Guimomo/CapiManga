import Usuario from "../models/Usuario.js";
import Serie from "../models/Serie.js";

class SerieService{

  static async getSeries() { 
    try {
      // Creamos la instancia del modelo serie
      const OBJSerie = new Serie();
      // Llamamos el método listar
      const series = await OBJSerie.getAll();
      // Validamos si no hay series
      if (series.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay series registradas",
        };
      }
      // Retornamos las series obtenidas
      return {
        error: false,
        code: 200,
        message: "Series obtenidas correctamente",
        data: productos,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "Error al obtener las series",
      };
    }
  }

  static async getSerieById(id) { 
    try {
      // Creamos la instancia del modelo producto
      const OBJSerie = new Serie();
      // Llamamos el método consultar por ID
      const serie = await OBJSerie.getById(id);
      // Validamos si no hay producto
      if (!serie || serie.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Serie no encontrada",
        };
      }
      // Retornamos el producto obtenido
      return {
        error: false,
        code: 200,
        message: "Serie obtenida correctamente",
        data: producto,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "Error al obtener la serie",
      };
    }
  }

  // Crear una nueva serie
  static async createSerie(titulo, descripcion, id_autor, portada_path, banner_path, tipo_contenido) { 
    try {
      // Validamos que el id del usuario exista
      const OBJUsuario = new Usuario();
      // Consultamos la categoría por ID
      const autor = await OBJUsuario.getById(id_autor);
      // Validamos si no hay categoría
      if (!autor || autor.length === 0) {
        return {
          error: true,
          code: 404,
          message: "El autor no existe",
        };
      }
      // Creamos la instancia del modelo Serie
      const OBJSerie = new Serie();
      // Llamamos el método crear
      const serieCreada = await OBJSerie.create(
        titulo,
        descripcion,
        id_autor,
        portada_path,
        banner_path,
        tipo_contenido
      );
      // Retornamos la serie creada
      return {
        error: false,
        code: 201,
        message: "Serie creada correctamente",
        data: productoCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "Error al crear la serie",
      };
    }
  }

  // Actualizar una serie
  static async updateSerie(id, campos) { 
    try {

      const OBJSerie = new Serie();

      const serieActualizada = await OBJSerie.update(id, campos);

      if (serieActualizada === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la serie",
        };
      }

      return {
        error: false,
        code: 200,
        message: "Serie actualizada correctamente",
        data: productoActualizado,
      };

    } catch (error) {

      return {
        error: true,
        code: 500,
        message: "Error al actualizar la serie",
      };
    }
  } 

  // Eliminar una serie
  static async deleteSerie(id) { 
    try {

      const OBJSerie = new Serie();

      const serieEliminada = await OBJSerie.delete(id);

      if (serieEliminada === null) {
        return {
          error: true,
          code: 400,
          message: serieEliminada.mensaje,
        };
      }

      return {
        error: false,
        code: 200,
        message: "Serie eliminada correctamente",
        data: serieEliminada,
      };
    } catch (error) {

      return {
        error: true,
        code: 500,
        message: "Error al eliminar la serie",
      };
    }
  }
}

export default SerieService;