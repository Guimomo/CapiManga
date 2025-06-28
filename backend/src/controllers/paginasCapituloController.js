import { ResponseProvider } from "../providers/ResponseProvider.js";
import PaginasCapituloService from "../services/PaginasCapituloService.js";

class PaginasCapituloController {
  // Obtener todas las páginas
  static getAllPaginas = async (req, res) => {
    try {
      const response = await PaginasCapituloService.getPaginas();
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener una página por su ID
  static getPaginaById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await PaginasCapituloService.getPaginaById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear una nueva página
  static createPagina = async (req, res) => {
    try {
      const response = await PaginasCapituloService.createPagina(req.body);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar una página
  static updatePagina = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      const response = await PaginasCapituloService.updatePagina(id, campos);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar una página
  static deletePagina = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await PaginasCapituloService.deletePagina(id);
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

export default PaginasCapituloController;
