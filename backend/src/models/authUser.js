// models/Usuario.js
import db from "../utils/db.js";

export class Usuario {
  
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM Usuario WHERE email_Usuario = ?", [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM Usuario WHERE id = ?", [id]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await db.query("SELECT * FROM Usuario");
    return rows;
  }

  static async create({
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
  }) {
    const [result] = await db.query(
      `INSERT INTO Usuario (
        nombre, user_Name, foto_Perfil, banner_Perfil, rol_Usuario, edad_Usuario, fecha_Nacimiento, email_Usuario, telefono, contrasena, genero_Usuario, biografia_Usuario, visibilidad_Usuario, refresh_Token
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
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
      ]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const campos = [];
    const valores = [];
    for (const key in data) {
      campos.push(`${key} = ?`);
      valores.push(data[key]);
    }
    valores.push(id);
    await db.query(`UPDATE Usuario SET ${campos.join(", ")} WHERE id = ?`, valores);
  }

  static async delete(id) {
    await db.query("DELETE FROM Usuario WHERE id = ?", [id]);
  }

  static async updateRefreshToken(id, refreshToken) {
    await db.query("UPDATE Usuario SET refresh_Token = ? WHERE id = ?", [refreshToken, id]);
  }
}
