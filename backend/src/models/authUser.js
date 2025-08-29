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

  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM Usuario WHERE id = ?", [id]);
    return rows[0];
  }

  static async create({ nombre, user_Name, email_Usuario, contrasena, codigo_telefonico = null, telefono = null, fecha_Nacimiento, genero_Usuario }) {
    const [result] = await db.query(
      `INSERT INTO Usuario (nombre, user_Name, email_Usuario, contrasena, codigo_telefonico, telefono, fecha_Nacimiento, genero_Usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, user_Name, email_Usuario, contrasena, codigo_telefonico, telefono, fecha_Nacimiento, genero_Usuario]
    );
    return { id: result.insertId };
  }

  static async updateRefreshToken(id, refresh_Token) {
    await db.query("UPDATE Usuario SET refresh_Token = ? WHERE id = ?", [
      refresh_Token,
      id,
    ]);
  }

  static async updatePerfil(id, { nombre, user_Name, biografia_Usuario, foto_Perfil, banner_Perfil, color_Usuario }) {
    await db.query(
      `UPDATE Usuario SET nombre = ?, user_Name = ?, biografia_Usuario = ?, foto_Perfil = ?, banner_Perfil = ?, color_Usuario = ? WHERE id = ?`,
      [nombre, user_Name, biografia_Usuario, foto_Perfil, banner_Perfil, color_Usuario, id]
    );
  }

  static async updateDatosPersonales(id, {genero_Usuario, fecha_Nacimiento, email_Usuario, telefono, contrasena }) {
    let query = `UPDATE Usuario SET genero_Usuario = ?, fecha_Nacimiento = ?, email_Usuario = ?, telefono = ?`;
    const params = [genero_Usuario, fecha_Nacimiento, email_Usuario, telefono];
    if (contrasena) {
      query += `, contrasena = ?`;
      params.push(contrasena);
    }
    query += ` WHERE id = ?`;
    params.push(id);
    await db.query(query, params);
  }

  static async updatePrivacidad(id, visibilidad_Usuario) {
    await db.query(
      `UPDATE Usuario SET visibilidad_Usuario = ? WHERE id = ?`,
      [visibilidad_Usuario, id]
    );
  }
}
