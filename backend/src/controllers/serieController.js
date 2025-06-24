import { ResponseProvider } from "../providers/ResponseProvider.js";
import SerieService from "../services/SerieService.js";

class SerieController{

  // Obtener todos los productos
  static getAllSeries = async (req, res) => {
    try {
      const response = await SerieService.getSeries();

      if (response.error) {

        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      }
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      return ResponseProvider.error(
        res,
        "Error interno en el servidor",
        500
      );
    }
  };

  // Obtener una serie por su ID
  static getSerieById = async (req, res) => {
    const { id } = req.params;
    try {

      const response = await SerieService.getSerieById(id);

      if (response.error) {

        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      }
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {

      return ResponseProvider.error(
        res,
        "Error interno en el servidor",
        500
      );
    }
  };

  // Crear una nueva serie
  static createSerie = async (req, res) => {  
    const { titulo, descripcion, id_autor, portada_path, banner_path, tipo_contenido } = req.body;  
    try {

      const serie = await SerieService.createSerie(
        titulo,
        descripcion,
        id_autor,
        portada_path,
        banner_path,
        tipo_contenido
      );

      if (serie.error) {

        return ResponseProvider.error(
          res,
          serie.message,
          serie.code
        );
      }

      return ResponseProvider.success(
        res,
        serie,
        "Serie creada correctamente",
        201
      );
    } catch (error) {

      return ResponseProvider.error(
        res,
        "Error interno al crear la serie",
        500
      );
    }
  };

  // Actualizar una serie
  static updateSerie = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {

      const response = await SerieService.updateSerie(id, campos);

      // const producto = await ProductService.updateProduct(
      //   id,
      //   campos
      // );

      if (response.error) {
        return ResponseProvider.error(
          res,
          "Error al actualizar la serie",
          400
        );
      }

      return ResponseProvider.success(
        res,
        response.data,
        "Serie actualizada correctamente",
        200
      );
    } catch (error) {

      return ResponseProvider.error(
        res,
        "Error interno al actualizar la serie",
        500
      );
    }
  };

  // Eliminar una serie
  static deleteSerie = async (req, res) => {
    const { id } = req.params;
    try {

      const response = await SerieService.deleteSerie(id);

      if (response.error) {

        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {

      return ResponseProvider.error(
        res,
        "Error interno al eliminar la serie",
        500
      );
    }
  }

}

export default SerieController;
