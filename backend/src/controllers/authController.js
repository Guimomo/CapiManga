import { ResponseProvider } from "../providers/ResponseProvider.js";
import AuthService from "../services/authService.js";
import fs from 'fs';
import path from 'path';

export const register = async (req, res) => {
  const { nombre, email_Usuario, contrasena, user_Name, telefono, fecha_Nacimiento, genero_Usuario } = req.body;
  try {
    const response = await AuthService.register(nombre, email_Usuario, contrasena, user_Name, telefono, fecha_Nacimiento, genero_Usuario);
    if (response.error) {
      ResponseProvider.error(
        res, 
        response.message, 
        response.code
      );

    } else {
      // Crear carpeta de usuario en uploads si el registro fue exitoso
      const userId = response.data.id;
      const userDir = path.resolve('uploads', String(userId));
      try {

        if (!fs.existsSync(userDir)) {
          fs.mkdirSync(userDir, { recursive: true });
          
        } else {
          console.log('La carpeta ya existe:', userDir);
        }
      } catch (err) {
        console.error('Error creando la carpeta de usuario:', err);
      }
      ResponseProvider.success(
        res, 
        response.data, 
        response.message, 
        response.code
      );
      
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
      ResponseProvider.error(
        res, 
        response.message, 
        response.code
      );
      ResponseProvider.error(
        res, 
        "Error en el servidor", 
        500
      );

    } else {
      ResponseProvider.success(
        res, 
        response.data, 
        response.message, 
        response.code
      );

    }
  } catch (error) {
    ResponseProvider.error(
      res, 
      "Error en el servidor", 
      500
    );

  }
};

export const logout = async (req, res) => {
  try {

    // Llamamos el servio y pasamos el id del usuario
    const response = await AuthService.logout(req.user.id);

    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.success(res, {}, response.message, response.code);

    return res.status(response.code).json(response);

  } catch (error) {
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
};

export const refreshToken = async (req, res) => {

  const authHeader = req.headers.authorization;
  try {
    const refreshToken = authHeader.split(" ")[1];
    const response = await AuthService.verifyAccessToken(refreshToken);
    if (response.error) {
      ResponseProvider.error(
        res, 
        response.message, 
        response.code
      );

    } else {
      ResponseProvider.success(
        res, 
        response.data, 
        response.message, 
        response.code
      );

    }
  } catch (error) {
    ResponseProvider.error(
      res, 
      "Error en el servidor", 
      500
    );

  }
};