import GuardarHistoria from "../models/GuardarHistoria.js";

class GuardarHistoriaService {
  static async getGuardadosByHistoriaId(id_Historia) {
    try {
      const instance = new GuardarHistoria();
      const guardados = await instance.getByHistoriaId(id_Historia);
      return { error: false, code: 200, message: "Guardados obtenidos correctamente", data: guardados };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener los guardados por historia" };
    }
  }
  static async getGuardados() {
    try {
      const instance = new GuardarHistoria();
      const guardados = await instance.getAll();
      if (!guardados.length) {
        return { error: true, code: 404, message: "No hay historias guardadas" };
      }
      return { error: false, code: 200, message: "Historias guardadas obtenidas correctamente", data: guardados };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener las historias guardadas" };
    }
  }

  static async getGuardadoById(id_Historia, guardada_por) {
    try {
      const instance = new GuardarHistoria();
      const guardado = await instance.getById(id_Historia, guardada_por);
      if (!guardado || guardado.length === 0) {
        return { error: true, code: 404, message: "Guardado no encontrado" };
      }
      return { error: false, code: 200, message: "Guardado obtenido correctamente", data: guardado };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener el guardado" };
    }
  }

  static async createGuardado(data) {
    try {
      const instance = new GuardarHistoria();
      const guardado = await instance.create(data);
      if (guardado === null) {
        return { error: true, code: 400, message: "Error al crear el guardado" };
      }
      return { error: false, code: 201, message: "Guardado creado correctamente", data: guardado };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al crear el guardado" };
    }
  }

  static async updateGuardado(id_Historia, guardada_por, campos) {
    try {
      const instance = new GuardarHistoria();
      const guardadoExistente = await instance.getById(id_Historia, guardada_por);
      if (guardadoExistente.length === 0) {
        return { error: true, code: 404, message: "Guardado no encontrado" };
      }
      const guardado = await instance.update(id_Historia, guardada_por, campos);
      if (guardado === null) {
        return { error: true, code: 400, message: "Error al actualizar el guardado" };
      }
      return { error: false, code: 200, message: "Guardado actualizado correctamente", data: guardado };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al actualizar el guardado" };
    }
  }

  static async deleteGuardado(id_Historia, guardada_por) {
    try {
      const instance = new GuardarHistoria();
      const guardadoExistente = await instance.getById(id_Historia, guardada_por);
      if (guardadoExistente.length === 0) {
        return { error: true, code: 404, message: "Guardado no encontrado" };
      }
      const resultado = await instance.delete(id_Historia, guardada_por);
      if (resultado.error) {
        return { error: true, code: 400, message: resultado.mensaje };
      }
      return { error: false, code: 200, message: "Guardado eliminado correctamente", data: guardadoExistente };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al eliminar el guardado" };
    }
  }
}

export default GuardarHistoriaService;
