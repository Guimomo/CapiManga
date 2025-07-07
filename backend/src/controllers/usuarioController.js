import { Usuario } from "../models/authUser.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    ResponseProvider.success(res, usuarios, "Usuarios listados correctamente", 200);
  } catch (error) {
    ResponseProvider.error(res, "Error al obtener usuarios", 500);
  }
};

export const getPerfil = async (req, res) => {
  try {
    const id = req.user.id; // El id viene del token
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return ResponseProvider.error(res, "Usuario no encontrado", 404);
    }
    // Devuelve solo los datos necesarios
    ResponseProvider.success(res, {
      user_Name: usuario.user_Name,
      foto_Perfil: usuario.foto_Perfil,
      email_Usuario: usuario.email_Usuario,
      nombre: usuario.nombre
    }, "Perfil obtenido correctamente", 200);
  } catch (error) {
    ResponseProvider.error(res, "Error al obtener perfil", 500);
  }
};
