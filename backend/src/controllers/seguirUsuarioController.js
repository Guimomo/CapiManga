import { ResponseProvider } from "../providers/ResponseProvider.js";
import SeguirUsuarioService from "../services/SeguirUsuarioService.js";

class SeguirUsuarioController {
  // Obtener todos los seguimientos
  static getAllSeguimientos = async (req, res) => {
    try {
      const response = await SeguirUsuarioService.getSeguimientos();
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un seguimiento por su ID compuesto
  static getSeguimientoById = async (req, res) => {
    const { siguiendo_a, seguido_por } = req.params;
    try {
      const response = await SeguirUsuarioService.getSeguimientoById(siguiendo_a, seguido_por);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener los seguidores de este usuario
  static getSeguimientoBySiguiendo = async (req, res) => {
    const { siguiendo_a } = req.params;
    try {
      const response = await SeguirUsuarioService.getSeguimientoBySiguiendoA(siguiendo_a);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener los usuarios que sigue este usuario (seguidos)
  static getSeguimientoBySeguido = async (req, res) => {
    const { seguido_por } = req.params;
    try {
      const response = await SeguirUsuarioService.getSeguimientoBySeguidoPor(seguido_por);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear un nuevo seguimiento
  static createSeguimiento = async (req, res) => {
    try {
      const response = await SeguirUsuarioService.createSeguimiento(req.body);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un seguimiento
  static updateSeguimiento = async (req, res) => {
    const { siguiendo_a, seguido_por } = req.params;
    const campos = req.body;
    try {
      const response = await SeguirUsuarioService.updateSeguimiento(siguiendo_a, seguido_por, campos);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un seguimiento
  static deleteSeguimiento = async (req, res) => {
    const { siguiendo_a, seguido_por } = req.params;
    try {
      const response = await SeguirUsuarioService.deleteSeguimiento(siguiendo_a, seguido_por);
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

export default SeguirUsuarioController;
