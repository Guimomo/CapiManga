import { ResponseProvider } from "../providers/ResponseProvider.js";
import EdadRecomendadaService from "../services/EdadRecomendadaService.js";

class EdadRecomendadaController {
  // Obtener todas las edades recomendadas
  static getAllEdadesRecomendadas = async (req, res) => {
    try {
      const response = await EdadRecomendadaService.getEdadesRecomendadas();
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener una edad recomendada por su ID
  static getEdadRecomendadaById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await EdadRecomendadaService.getEdadRecomendadaById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear una nueva edad recomendada
  static createEdadRecomendada = async (req, res) => {
    const { tipo_Recomendacion, edad_Minima, edad_Maxima } = req.body;
    try {
      const response = await EdadRecomendadaService.createEdadRecomendada(tipo_Recomendacion, edad_Minima, edad_Maxima);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar una edad recomendada
  static updateEdadRecomendada = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      const response = await EdadRecomendadaService.updateEdadRecomendada(id, campos);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar una edad recomendada
  static deleteEdadRecomendada = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await EdadRecomendadaService.deleteEdadRecomendada(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default EdadRecomendadaController;
