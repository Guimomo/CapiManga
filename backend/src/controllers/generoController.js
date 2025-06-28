import { ResponseProvider } from "../providers/ResponseProvider.js";
import GeneroService from "../services/GeneroService.js";

class GeneroController {
  // Obtener todos los géneros
  static getAllGeneros = async (req, res) => {
    try {
      const response = await GeneroService.getGeneros();
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un género por su ID
  static getGeneroById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await GeneroService.getGeneroById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear un nuevo género
  static createGenero = async (req, res) => {
    const { nombre } = req.body;
    try {
      const response = await GeneroService.createGenero(nombre);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un género
  static updateGenero = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      const response = await GeneroService.updateGenero(id, campos);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un género
  static deleteGenero = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await GeneroService.deleteGenero(id);
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

export default GeneroController;
