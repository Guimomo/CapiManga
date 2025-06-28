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
