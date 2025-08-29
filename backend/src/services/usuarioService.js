import { Usuario } from "../models/authUser.js";

class UsuarioService {
    static async getUsuarios() {
        try {
            const usuarios = await Usuario.findAll();
            
            if (usuarios.length === 0) {
                return { error: true, code: 404, message: "No hay usuarios registrados" };
            }
            return { error: false, code: 200, message: "Usuarios obtenidos correctamente", data: usuarios };

        } catch (error) {
            return { error: true, code: 500, message: "Error al obtener los usuarios" };
        }

    }

    static async getPerfilAuth(id) {
        try {
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return { error: true, code: 404, message: "Usuario no encontrado" };
            }
            return { error: false, code: 200, message: "Perfil obtenido correctamente", data: usuario };
        } catch (error) {
            return { error: true, code: 500, message: "Error al obtener el perfil" };
        }
    }

    static async getUsuarioById(id) {
        try {
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return { error: true, code: 404, message: "Usuario no encontrado" };
            }
            return { error: false, code: 200, message: "Usuario obtenido correctamente", data: usuario };
        } catch (error) {
            return { error: true, code: 500, message: "Error al obtener el usuario" };
        }
    }

    static async updateUsuario(id, campos) {
        try {
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return { error: true, code: 404, message: "Usuario no encontrado" };
            }
            await Usuario.updatePerfil(id, campos);
            return { error: false, code: 200, message: "Usuario actualizado correctamente", data: await Usuario.findById(id) };
        } catch (error) {
            return { error: true, code: 500, message: "Error al actualizar el usuario" };
        }
    }

    static async updateDatosPersonales(id, campos) {
        try {
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return { error: true, code: 404, message: "Usuario no encontrado" };
            }
            await Usuario.updateDatosPersonales(id, campos);
            return { error: false, code: 200, message: "Datos personales actualizados correctamente", data: await Usuario.findById(id) };
        } catch (error) {
            return { error: true, code: 500, message: "Error al actualizar los datos personales" };
        }
    }

    static async updatePrivacidad(id, visibilidad_Usuario) {
        try {
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return { error: true, code: 404, message: "Usuario no encontrado" };
            }
            await Usuario.updatePrivacidad(id, visibilidad_Usuario);
            return { error: false, code: 200, message: "Privacidad actualizada correctamente", data: await Usuario.findById(id) };
        } catch (error) {
            return { error: true, code: 500, message: "Error al actualizar la privacidad" };
        }
    }
}

export default UsuarioService;