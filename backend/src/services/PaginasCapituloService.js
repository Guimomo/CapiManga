import PaginasCapitulo from "../models/PaginasCapitulo.js";

class PaginasCapituloService {

  static async getPaginas() {
    try {
      const instance = new PaginasCapitulo();
      const paginas = await instance.getAll();
      if (!paginas.length) {
        return { error: true, code: 404, message: "No hay páginas registradas" };
      }
      return { error: false, code: 200, message: "Páginas obtenidas correctamente", data: paginas };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener las páginas" };
    }
  }

  static async getPaginaById(id) {
    try {
      const instance = new PaginasCapitulo();
      const pagina = await instance.getById(id);
      if (!pagina || pagina.length === 0) {
        return { error: true, code: 404, message: "Página no encontrada" };
      }
      return { error: false, code: 200, message: "Página obtenida correctamente", data: pagina };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener la página" };
    }
  }

  static async getPaginasByCapituloId(id_Capitulo) {
    try {
      const instance = new PaginasCapitulo();
      const paginas = await instance.getByCapituloId(id_Capitulo);
      if (!paginas || paginas.length === 0) {
        return { error: true, code: 404, message: "No hay páginas para este capítulo" };
      }
      return { error: false, code: 200, message: "Páginas del capítulo obtenidas correctamente", data: paginas };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener las páginas del capítulo" };
    }
  }

  static async createPagina(data) {
    try {
      const instance = new PaginasCapitulo();
      const pagina = await instance.create(data);
      if (pagina === null) {
        return { error: true, code: 400, message: "Error al crear la página" };
      }
      return { error: false, code: 201, message: "Página creada correctamente", data: pagina };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al crear la página" };
    }
  }

  static async updatePagina(id, campos) {
    try {
      const instance = new PaginasCapitulo();
      const paginaExistente = await instance.getById(id);
      if (paginaExistente.length === 0) {
        return { error: true, code: 404, message: "Página no encontrada" };
      }
      const pagina = await instance.update(id, campos);
      if (pagina === null) {
        return { error: true, code: 400, message: "Error al actualizar la página" };
      }
      return { error: false, code: 200, message: "Página actualizada correctamente", data: pagina };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al actualizar la página" };
    }
  }
  
  static async deletePagina(id) {
    try {
      const instance = new PaginasCapitulo();
      const paginaExistente = await instance.getById(id);
      if (paginaExistente.length === 0) {
        return { error: true, code: 404, message: "Página no encontrada" };
      }
      const resultado = await instance.delete(id);
      if (resultado.error) {
        return { error: true, code: 400, message: resultado.mensaje };
      }
      return { error: false, code: 200, message: "Página eliminada correctamente", data: paginaExistente };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al eliminar la página" };
    }
  }
}

export default PaginasCapituloService;
