import CalificacionHistoria from "../models/CalificacionHistoria.js";

class CalificacionHistoriaService {
    
  static async getCalificaciones() {
    try {
      const instance = new CalificacionHistoria();
      const calificaciones = await instance.getAll();
      if (!calificaciones.length) {
        return { error: true, code: 404, message: "No hay calificaciones registradas" };
      }
      return { error: false, code: 200, message: "Calificaciones obtenidas correctamente", data: calificaciones };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener las calificaciones" };
    }
  }

  static async getCalificacionById(id_Historia, calificada_por) {
    try {
      const instance = new CalificacionHistoria();
      const calificacion = await instance.getById(id_Historia, calificada_por);
      if (!calificacion || calificacion.length === 0) {
        return { error: true, code: 404, message: "Calificación no encontrada" };
      }
      return { error: false, code: 200, message: "Calificación obtenida correctamente", data: calificacion };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener la calificación" };
    }
  }

  static async createCalificacion(data) {
    try {
      const instance = new CalificacionHistoria();
      const calificacion = await instance.create(data);
      if (calificacion === null) {
        return { error: true, code: 400, message: "Error al crear la calificación" };
      }
      return { error: false, code: 201, message: "Calificación creada correctamente", data: calificacion };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al crear la calificación" };
    }
  }

  static async updateCalificacion(id_Historia, calificada_por, campos) {
    try {
      const instance = new CalificacionHistoria();
      const calificacionExistente = await instance.getById(id_Historia, calificada_por);
      if (calificacionExistente.length === 0) {
        return { error: true, code: 404, message: "Calificación no encontrada" };
      }
      const calificacion = await instance.update(id_Historia, calificada_por, campos);
      if (calificacion === null) {
        return { error: true, code: 400, message: "Error al actualizar la calificación" };
      }
      return { error: false, code: 200, message: "Calificación actualizada correctamente", data: calificacion };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al actualizar la calificación" };
    }
  }

  static async deleteCalificacion(id_Historia, calificada_por) {
    try {
      const instance = new CalificacionHistoria();
      const calificacionExistente = await instance.getById(id_Historia, calificada_por);
      if (calificacionExistente.length === 0) {
        return { error: true, code: 404, message: "Calificación no encontrada" };
      }
      const resultado = await instance.delete(id_Historia, calificada_por);
      if (resultado.error) {
        return { error: true, code: 400, message: resultado.mensaje };
      }
      return { error: false, code: 200, message: "Calificación eliminada correctamente", data: calificacionExistente };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al eliminar la calificación" };
    }
  }
}

export default CalificacionHistoriaService;
