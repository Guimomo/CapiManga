import { ResponseProvider } from "../providers/ResponseProvider.js";
import AuthService from "../services/authService.js";

export const register = async (req, res) => {
  // Extraer explícitamente los campos de la tabla Usuario
  const {
    nombre,
    user_Name,
    foto_Perfil = null,
    banner_Perfil = null,
    rol_Usuario = 'normal',
    edad_Usuario = null,
    fecha_Nacimiento,
    email_Usuario,
    telefono = null,
    contrasena,
    genero_Usuario = null,
    biografia_Usuario = null,
    visibilidad_Usuario = 'publico',
    refresh_Token = null
  } = req.body;

  console.log("Datos recibidos:", {
    nombre,
    user_Name,
    foto_Perfil,
    banner_Perfil,
    rol_Usuario,
    edad_Usuario,
    fecha_Nacimiento,
    email_Usuario,
    telefono,
    contrasena,
    genero_Usuario,
    biografia_Usuario,
    visibilidad_Usuario,
    refresh_Token
  });

  try {
    const response = await AuthService.register({
      nombre,
      user_Name,
      foto_Perfil,
      banner_Perfil,
      rol_Usuario,
      edad_Usuario,
      fecha_Nacimiento,
      email_Usuario,
      telefono,
      contrasena,
      genero_Usuario,
      biografia_Usuario,
      visibilidad_Usuario,
      refresh_Token
    });
    if (response.error) {
      ResponseProvider.error(res, response.message, response.code);
    } else {
      ResponseProvider.success(res, {}, response.message, response.code);
    }
  } catch (error) {
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
};

export const login = async (req, res) => {
  const { email_Usuario, contrasena } = req.body;
  try {
    const response = await AuthService.login(email_Usuario, contrasena);
    if (response.error) {
      ResponseProvider.error(res, response.message, response.code);
    } else {
      ResponseProvider.success(res, response.data, response.message, response.code);
    }
  } catch (error) {
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
};

export const logout = async (req, res) => {
  try {
    const response = await AuthService.logout(req.user.id);
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.success(res, {}, response.message, response.code);
    return res.status(response.code).json(response);
  } catch (error) {
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
};

export const refreshToken = async (req, res) => {  
  // Asiganmos el token a una variable
  const authHeader = req.headers.authorization;  
  try {
    const refreshToken = authHeader.split(" ")[1];
    // Verificamos el token de accesso
    const response = await AuthService.verifyAccessToken(refreshToken);    
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.success(
      res,
      response.data,
      response.message,
      response.code
    );
  } catch (error) {      
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
};