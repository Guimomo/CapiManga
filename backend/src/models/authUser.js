// models/Usuario.js
import db from "../utils/db.js";

export class Usuario {
  
  static async findAll() {
    const [rows] = await db.query("SELECT * FROM Usuario");
    return rows;
  }

  static async findByEmail(email_Usuario) {
    const [rows] = await db.query("SELECT * FROM Usuario WHERE email_Usuario = ?", [
      email_Usuario,
    ]);
    return rows[0];
  }

  static async findByUserName(user_Name) {
    const [rows] = await db.query("SELECT * FROM Usuario WHERE user_Name = ?", [
      user_Name,
    ]);
    return rows[0];
  }

  static async create({ nombre, user_Name, email_Usuario, contrasena, telefono = null, fecha_Nacimiento }) {
    const [result] = await db.query(
      `INSERT INTO Usuario (nombre, user_Name, email_Usuario, contrasena, telefono, fecha_Nacimiento) VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, user_Name, email_Usuario, contrasena, telefono, fecha_Nacimiento]
    );
    return { id: result.insertId };
  }

  static async updateRefreshToken(id, refresh_Token) {
    await db.query("UPDATE Usuario SET refresh_Token = ? WHERE id = ?", [
      refresh_Token,
      id,
    ]);
  }
}
