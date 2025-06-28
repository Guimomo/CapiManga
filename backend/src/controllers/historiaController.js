import { ResponseProvider } from "../providers/ResponseProvider.js";
import HistoriaService from "../services/HistoriaService.js";

class HistoriaController {
  // Obtener todas las historias
  static getAllHistorias = async (req, res) => {
    try {
      const response = await HistoriaService.getHistorias();
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener una historia por su ID
  static getHistoriaById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await HistoriaService.getHistoriaById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear una nueva historia
  static createHistoria = async (req, res) => {
    // Asignar el autor desde el usuario autenticado
    //**
    // Sí, aquí debes modificar la función `createHistoria` para que asigne automáticamente el campo `autor_Historia` usando 
    //el id del usuario autenticado (`req.user.id`), en vez de tomarlo del body.
    // Así garantizas que siempre se registre el usuario logueado como autor de la historia, sin depender del frontend.
    // */

    const data = { ...req.body, autor_Historia: req.user.id };
    try {
      const response = await HistoriaService.createHistoria(data);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar una historia
  static updateHistoria = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      const response = await HistoriaService.updateHistoria(id, campos);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar una historia
  static deleteHistoria = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await HistoriaService.deleteHistoria(id);
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

export default HistoriaController;
