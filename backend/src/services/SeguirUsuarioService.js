import SeguirUsuario from "../models/SeguirUsuario.js";

class SeguirUsuarioService {
  static async getSeguimientos() {
    try {
      const instance = new SeguirUsuario();
      const seguimientos = await instance.getAll();
      if (!seguimientos.length) {
        return { error: true, code: 404, message: "No hay seguimientos registrados" };
      }
      return { error: false, code: 200, message: "Seguimientos obtenidos correctamente", data: seguimientos };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener los seguimientos" };
    }
  }

  static async getSeguimientoById(siguiendo_a, seguido_por) {
    try {
      const instance = new SeguirUsuario();
      const seguimiento = await instance.getById(siguiendo_a, seguido_por);
      if (!seguimiento || seguimiento.length === 0) {
        return { error: true, code: 404, message: "Seguimiento no encontrado" };
      }
      return { error: false, code: 200, message: "Seguimiento obtenido correctamente", data: seguimiento };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener el seguimiento" };
    }
  }

  // Obtener los usuarios que sigue este usuario (seguidos)
  static async getSeguimientoBySeguidoPor(seguido_por) {
    try {
      const instance = new SeguirUsuario();
      const seguimientos = await instance.findSeguidosPorUsuario(seguido_por);
      if (!seguimientos || seguimientos.length === 0) {
        return { error: true, code: 404, message: "No hay seguidos para el usuario" };
      }
      return { error: false, code: 200, message: "Seguidos obtenidos correctamente", data: seguimientos };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener los seguidos por usuario" };
    }
  }

  // Obtener los seguidores de este usuario
  static async getSeguimientoBySiguiendoA(siguiendo_a) {
    try {
      const instance = new SeguirUsuario();
      const seguidores = await instance.findSeguidoresDeUsuario(siguiendo_a);
      if (!seguidores || seguidores.length === 0) {
        return { error: true, code: 404, message: "No hay seguidores para el usuario" };
      }
      return { error: false, code: 200, message: "Seguidores obtenidos correctamente", data: seguidores };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener los seguidores por usuario" };
    }
  }

  static async createSeguimiento(data) {
    try {
      const instance = new SeguirUsuario();
      const seguimiento = await instance.create(data);
      if (seguimiento === null) {
        return { error: true, code: 400, message: "Error al crear el seguimiento" };
      }
      return { error: false, code: 201, message: "Seguimiento creado correctamente", data: seguimiento };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al crear el seguimiento" };
    }
  }

  static async updateSeguimiento(siguiendo_a, seguido_por, campos) {
    try {
      const instance = new SeguirUsuario();
      const seguimientoExistente = await instance.getById(siguiendo_a, seguido_por);
      if (seguimientoExistente.length === 0) {
        return { error: true, code: 404, message: "Seguimiento no encontrado" };
      }
      const seguimiento = await instance.update(siguiendo_a, seguido_por, campos);
      if (seguimiento === null) {
        return { error: true, code: 400, message: "Error al actualizar el seguimiento" };
      }
      return { error: false, code: 200, message: "Seguimiento actualizado correctamente", data: seguimiento };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al actualizar el seguimiento" };
    }
  }

  static async deleteSeguimiento(siguiendo_a, seguido_por) {
    try {
      const instance = new SeguirUsuario();
      const seguimientoExistente = await instance.getById(siguiendo_a, seguido_por);
      if (seguimientoExistente.length === 0) {
        return { error: true, code: 404, message: "Seguimiento no encontrado" };
      }
      const resultado = await instance.delete(siguiendo_a, seguido_por);
      if (resultado.error) {
        return { error: true, code: 400, message: resultado.mensaje };
      }
      return { error: false, code: 200, message: "Seguimiento eliminado correctamente", data: seguimientoExistente };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al eliminar el seguimiento" };
    }
  }
}

export default SeguirUsuarioService;
