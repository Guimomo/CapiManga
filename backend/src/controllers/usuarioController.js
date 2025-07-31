import { Usuario } from "../models/authUser.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";
import { uploadUsuario } from "../middlewares/usuario/uploadUsuario.js";

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
      id: usuario.id,
      user_Name: usuario.user_Name,
      foto_Perfil: usuario.foto_Perfil,
      banner_Perfil: usuario.banner_Perfil,
      rol_Usuario: usuario.rol_Usuario,
      fecha_Nacimiento: usuario.fecha_Nacimiento,
      email_Usuario: usuario.email_Usuario,
      codigo_telefonico: usuario.codigo_telefonico,
      telefono: usuario.telefono,
      nombre: usuario.nombre,
      genero_Usuario: usuario.genero_Usuario,
      biografia_Usuario: usuario.biografia_Usuario,
      visibilidad_Usuario: usuario.visibilidad_Usuario,
      fecha_Usuario: usuario.fecha_Usuario
    }, "Perfil obtenido correctamente", 200);
  } catch (error) {
    ResponseProvider.error(res, "Error al obtener perfil", 500);
  }
};

export const updatePerfil = async (req, res) => {
  try {
    const id = req.user.id;
    // Campos editables
    const { user_Name, biografia_Usuario } = req.body;
    let foto_Perfil, banner_Perfil;
    if (req.files && req.files["foto_Perfil"]) {
      foto_Perfil = `/uploads/${id}/${req.files["foto_Perfil"][0].filename}`;
    }
    if (req.files && req.files["banner_Perfil"]) {
      banner_Perfil = `/uploads/${id}/${req.files["banner_Perfil"][0].filename}`;
    }
    // Actualizar en BD
    const usuario = await Usuario.findById(id);
    if (!usuario) return ResponseProvider.error(res, "Usuario no encontrado", 404);
    await Usuario.updatePerfil(id, {
      user_Name: user_Name || usuario.user_Name,
      biografia_Usuario: biografia_Usuario || usuario.biografia_Usuario,
      foto_Perfil: foto_Perfil || usuario.foto_Perfil,
      banner_Perfil: banner_Perfil || usuario.banner_Perfil,
    });
    ResponseProvider.success(res, {}, "Perfil actualizado", 200);
  } catch (error) {
    ResponseProvider.error(res, "Error al actualizar perfil", 500);
  }
};

export const updateDatosPersonales = async (req, res) => {
  try {
    const id = req.user.id;
    const { nombre, genero_Usuario, fecha_Nacimiento, email_Usuario, telefono, contrasena } = req.body;
    let hashedPassword = undefined;
    if (contrasena) {
      // Si se envía nueva contraseña, hashearla
      const bcrypt = await import('bcryptjs');
      hashedPassword = await bcrypt.default.hash(contrasena, 10);
    }
    await Usuario.updateDatosPersonales(id, {
      nombre,
      genero_Usuario,
      fecha_Nacimiento,
      email_Usuario,
      telefono,
      contrasena: hashedPassword
    });
    ResponseProvider.success(res, {}, "Datos personales actualizados", 200);
  } catch (error) {
    ResponseProvider.error(res, "Error al actualizar datos personales", 500);
  }
};

export const updatePrivacidad = async (req, res) => {
  try {
    const id = req.user.id;
    const { visibilidad_Usuario } = req.body;
    await Usuario.updatePrivacidad(id, visibilidad_Usuario);
    ResponseProvider.success(res, {}, "Privacidad actualizada", 200);
  } catch (error) {
    ResponseProvider.error(res, "Error al actualizar privacidad", 500);
  }

};

export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return ResponseProvider.error(res, "Usuario no encontrado", 404);
    }
    ResponseProvider.success(res, {
      id: usuario.id,
      user_Name: usuario.user_Name,
      foto_Perfil: usuario.foto_Perfil,
      banner_Perfil: usuario.banner_Perfil,
      rol_Usuario: usuario.rol_Usuario,
      fecha_Nacimiento: usuario.fecha_Nacimiento,
      email_Usuario: usuario.email_Usuario,
      telefono: usuario.telefono,
      nombre: usuario.nombre,
      genero_Usuario: usuario.genero_Usuario,
      biografia_Usuario: usuario.biografia_Usuario,
      visibilidad_Usuario: usuario.visibilidad_Usuario,
      fecha_Usuario: usuario.fecha_Usuario
    }, "Usuario obtenido correctamente", 200);
  } catch (error) {
    ResponseProvider.error(res, "Error al obtener usuario", 500);
  }
}