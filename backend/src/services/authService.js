import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { Usuario } from "../models/authUser.js";

dotenv.config();

const secretKey = process.env.ACCESS_TOKEN_SECRET;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;
const tokenExpiration = process.env.TOKEN_EXPIRATION;
const refreshExpiration = process.env.REFRESH_EXPIRATION;

class AuthService {
  /**
   * Registro de usuario usando la tabla Usuario
   * @param {*} nombre
   * @param {*} email_Usuario
   * @param {*} contrasena
   * @param {*} user_Name
   * @param {*} telefono
   * @returns
   */
  static async register(nombre, email_Usuario, contrasena, user_Name, telefono, fecha_Nacimiento, genero_Usuario) {
    try {
      // Verificar si el usuario ya existe por email
      const userExists = await Usuario.findByEmail(email_Usuario);
      if (userExists)
        return { error: true, code: 401, message: "El correo ya se encuentra registrado en el sistema" };
      // Verificar si el username ya existe
      const userNameExists = await Usuario.findByUserName(user_Name);
      if (userNameExists)
        return { error: true, code: 401, message: "El nombre de usuario ya está en uso" };
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      // Crear usuario
      const usuario = await Usuario.create({
        nombre,
        user_Name,
        email_Usuario,
        telefono,
        contrasena: hashedPassword,
        fecha_Nacimiento,
        genero_Usuario
      });
      // Calcular edad para devolverla en la respuesta
      const edad = this.calcularEdad(fecha_Nacimiento);
      return { error: false, code: 201, message: "Usuario creado", data: { id: usuario.id, edad } };

    } catch (error) {
      return { error: true, code: 500, message: "Error al crear el usuario" };
    }
  }

  /**
   * Login usando la tabla Usuario
   * @param {*} email_Usuario
   * @param {*} contrasena
   * @returns
   */
  static async login(email_Usuario, contrasena) {
    try {
      const user = await Usuario.findByEmail(email_Usuario);
      if (!user)
        return {
          error: true,
          code: 401,
          message: "El correo o la contraseña proporcionados no son correctos.",
        };
      // Comparmamos la contraseña del usuarios registrado con la ingresada basado en la llave de encriptación
      const validPassword = await bcrypt.compare(contrasena, user.contrasena);
      // Validamos si la contraseña es la misma
      if (!validPassword)
        return {
          error: true,
          code: 401,
          message: "El correo o la contraseña proporcionados no son correctos.",
        };
      // Generamos el token de seguridad
      const accessToken = this.generateAccessToken(user);
      // Generamos el refresh token
      const refreshToken = this.generateRefreshToken(user);
      // Actualizamos el refreshToken en la base de datos
      await Usuario.updateRefreshToken(user.id, refreshToken);
      // Retornamos los datos de validación del usuario
      return {
        error: false,
        code: 201,
        message: "Usuario autenticado correctamente",
        data: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      console.log(error);      
      return { error: true, code: 500, message: "Error en el servidor" };
    }
  }

  /**
   * Genera access token con datos de Usuario
   * @param {*} user
   * @returns
   */
  static generateAccessToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email_Usuario: user.email_Usuario,
        user_Name: user.user_Name,
        rol_Usuario: user.rol_Usuario,
      },
      secretKey,
      { expiresIn: tokenExpiration }
    );
  }

  /**
   * Genera refresh token
   * @param {*} user
   * @returns
   */
  static generateRefreshToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email_Usuario: user.email_Usuario,
      },
      refreshSecretKey,
      { expiresIn: refreshExpiration }
    );
  }

  /**
   * Verifica y renueva el access token usando refresh token
   * @param {*} refreshToken
   */
  static async verifyAccessToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, refreshSecretKey);
      const user = await Usuario.findByEmail(decoded.email_Usuario);
      if (!user || user.refresh_Token !== refreshToken) {
        return { error: true, code: 403, message: "Token inválido" };
      }
      
      // Generamos nuevo access token
      const accessToken = this.generateAccessToken(user);
      const newRefreshToken = await this.renewAccessToken(refreshToken, user);
      return {
        error: false,
        code: 201,
        message: "Token actualizado correctamente",
        data: {
          accessToken,
          refreshToken: newRefreshToken || refreshToken,
        },
      };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return {
          error: true,
          code: 403,
          message: "Token expirado, solicita un nuevo token",
        };
      }
      return { error: true, code: 403, message: "Token inválido" };
    }
  }

  /**
   * Renueva refresh token si está por expirar
   * @param {*} refreshToken
   * @param {*} user
   * @returns
   */
  static async renewAccessToken(refreshToken, user) {
    let newRefreshToken = "";
    const decoded = jwt.decode(refreshToken, { complete: true });
    // Segundos restantes
    const tiempoRestante = decoded.exp - Math.floor(Date.now() / 1000);
    if (tiempoRestante < 60 * 60 * 24) {
      // Si quedan menos de 24 horas
      newRefreshToken = jwt.sign(
        { id: user.id, email_Usuario: user.email_Usuario },
        refreshSecretKey,
        { 
          expiresIn: refreshExpiration 
        }
      );
      // Actualizamos el token de refresco en la base de datos
      await Usuario.updateRefreshToken(user.id, newRefreshToken);      
    }
    // Si aún es válido, no renueva el token
    return newRefreshToken;
  }

  /**
   * Logout: elimina el refresh token del usuario
   * @param {*} userId
   * @returns
   */
  static async logout(userId) {
    await Usuario.updateRefreshToken(userId, null);
    return { error: false, code: 200, message: "Sesión cerrada correctamente" };
  }

  /**
   * Calcula la edad a partir de la fecha de nacimiento
   * @param {*} fecha_Nacimiento
   * @returns
   */
  static calcularEdad(fecha_Nacimiento) {
    const hoy = new Date();
    const cumpleanos = new Date(fecha_Nacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const m = hoy.getMonth() - cumpleanos.getMonth();
    const d = hoy.getDate() - cumpleanos.getDate();
    if (m < 0 || (m === 0 && d < 0)) {
      edad--;
    }
    return edad;
  }

  
}

export default AuthService;