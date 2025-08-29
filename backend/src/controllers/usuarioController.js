import UsuarioService from "../services/usuarioService.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class UsuarioController {

    static getAllUsuarios = async (req, res) => {
        try {
            const response = await UsuarioService.getAllUsuarios();
            if (response.error) {
                return ResponseProvider.error(res, response.message, response.code);
            } else {
                return ResponseProvider.success(res, response.data, response.message, response.code);
            }
        } catch (error) {
            ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    };

    static getPerfil = async (req, res) => {
        try {
            const { id } = req.user; // El id viene del token
            const response = await UsuarioService.getPerfilAuth(id);
            if (response.error) {
                return ResponseProvider.error(res, response.message, response.code);
            } else {
                return ResponseProvider.success(res, response.data, response.message, response.code);
            }
        } catch (error) {
            ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    };

    static  getUsuarioById = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await UsuarioService.getUsuarioById(id);
            if (response.error) {
                return ResponseProvider.error(res, response.message, response.code);
            } else {
                return ResponseProvider.success(res, response.data, response.message, response.code);
            }
        } catch (error) {
            ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    };

    static updatePerfil = async (req, res) => {
        const id = req.user.id;
        const campos = req.body;
        try {
            const response = await UsuarioService.updateUsuario(id, campos);
            if (response.error) {
                return ResponseProvider.error(res, response.message, response.code);
            } else {
                return ResponseProvider.success(res, response.data, response.message, response.code);
            }
        } catch (error) {
            ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    }

    static updateDatosPersonales = async (req, res) => {
        const id = req.user.id;
        const campos = req.body;
        try {
            const response = await UsuarioService.updateDatosPersonales(id, campos);
            if (response.error) {
                return ResponseProvider.error(res, response.message, response.code);
            } else {
                return ResponseProvider.success(res, response.data, response.message, response.code);
            }
        } catch (error) {
            ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    };

    static updatePrivacidad = async (req, res) => {
        const id = req.user.id;
        const { visibilidad_Usuario } = req.body;
        try {
            const response = await UsuarioService.updatePrivacidad(id, visibilidad_Usuario);
            if (response.error) {
                return ResponseProvider.error(res, response.message, response.code);
            } else {
                return ResponseProvider.success(res, response.data, response.message, response.code);
            }
        } catch (error) {
            ResponseProvider.error(res, "Error interno en el servidor", 500);
        }

    }
};

export default UsuarioController;