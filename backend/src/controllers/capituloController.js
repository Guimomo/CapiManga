import { ResponseProvider } from "../providers/ResponseProvider.js";
import CapituloService from "../services/CapituloService.js";

class CapituloController {
  // Obtener todos los capítulos
  static getAllCapitulos = async (req, res) => {
    try {
      const response = await CapituloService.getCapitulos();
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un capítulo por su ID
  static getCapituloById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await CapituloService.getCapituloById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener capítulos por historia
  static getCapitulosByHistoria = async (req, res) => {
    const { id_Historia } = req.params;
    try {
      const response = await CapituloService.getCapitulosByHistoria(id_Historia);
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un capítulo por historia y capítulo
  static getCapituloByHistoriaAndCapitulo = async (req, res) => {
    const { historiaId, capituloId } = req.params;
    try {
      const response = await CapituloService.getCapituloByHistoriaAndCapitulo(historiaId, capituloId);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }

  // Crear un nuevo capítulo
  static createCapitulo = async (req, res) => {
    // Guardar ruta de imagen subida en el body (icono_Capitulo)
    //console.log('MULTER BODY:', req.body);
    //console.log('MULTER FILES:', req.files);
    if (req.files && req.files.icono_Capitulo) {
      req.body.icono_Capitulo = '/' + req.files.icono_Capitulo[0].path.replace(/\\/g, '/');
    }
    // Asignar el autor desde el usuario autenticado si aplica (opcional)
    const data = { ...req.body };
    try {
      const response = await CapituloService.createCapitulo(data);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un capítulo
  static updateCapitulo = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      const response = await CapituloService.updateCapitulo(id, campos);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un capítulo
  static deleteCapitulo = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await CapituloService.deleteCapitulo(id);
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

export default CapituloController;
