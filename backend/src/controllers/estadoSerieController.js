import { ResponseProvider } from "../providers/ResponseProvider.js";
import EstadoSerieService from "../services/EstadoSerieService.js";

class EstadoSerieController {
  // Obtener todos los estados de serie
  static getAllEstadosSerie = async (req, res) => {
    try {
      const response = await EstadoSerieService.getEstadosSerie();
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un estado de serie por su ID
  static getEstadoSerieById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await EstadoSerieService.getEstadoSerieById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear un nuevo estado de serie
  static createEstadoSerie = async (req, res) => {
    const { nombre_estado } = req.body;
    try {
      const response = await EstadoSerieService.createEstadoSerie(nombre_estado);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un estado de serie
  static updateEstadoSerie = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      const response = await EstadoSerieService.updateEstadoSerie(id, campos);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un estado de serie
  static deleteEstadoSerie = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await EstadoSerieService.deleteEstadoSerie(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default EstadoSerieController;
