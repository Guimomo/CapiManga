// models/Usuario.js
import db from "../utils/db.js";

export class Usuario {
  
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM Usuario WHERE mail = ?", [
      email,
    ]);
    return rows[0];
  }

  static async create(nombre, user_Name, mail, hashedPassword, telefono, foto_perfil_path, tipo_usuario) {
    console.log(nombre, user_Name, mail, hashedPassword, telefono, foto_perfil_path, tipo_usuario);
    const [result] = await db.query(
      "INSERT INTO Usuario (nombre, user_Name, mail, contrasena, telefono, foto_perfil_path, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, user_Name, mail, hashedPassword, telefono, foto_perfil_path, tipo_usuario]
    );
    return result.insertId;
  }

  static async updateRefreshToken(id, refreshToken) {
    await db.query("UPDATE Usuario SET refresh_token = ? WHERE id = ?", [
      refreshToken,
      id,
    ]);
  }
}
