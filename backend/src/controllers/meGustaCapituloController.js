import { ResponseProvider } from "../providers/ResponseProvider.js";
import MeGustaCapituloService from "../services/MeGustaCapituloService.js";

class MeGustaCapituloController {
  static getMeGustas = async (req, res) => {
    const { id_Capitulo } = req.params;
    try {
      const response = await MeGustaCapituloService.getMeGustas(id_Capitulo);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static getMeGustaById = async (req, res) => {
    const { id_Capitulo, id_Usuario } = req.params;
    try {
      const response = await MeGustaCapituloService.getMeGustaById(id_Capitulo, id_Usuario);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static createMeGusta = async (req, res) => {
    try {
      const response = await MeGustaCapituloService.createMeGusta(req.body);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static deleteMeGusta = async (req, res) => {
    const { id_Capitulo, id_Usuario } = req.body;
    try {
      const response = await MeGustaCapituloService.deleteMeGusta(id_Capitulo, id_Usuario);
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

export default MeGustaCapituloController;
