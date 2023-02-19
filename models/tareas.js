import { v4 as uuidv4 } from 'uuid';
import { Tarea } from './tarea.js';
import { leerDB } from '../helpers/guardar_archivo.js';
import colors from 'colors';
// Mas facil de manejar por llave de mapa
// _listado:
//   {'uuid-dsdvsdvsdv-sdvsdvsdv': {'id':12, 'name':'ssvsdvsdv'} }

class Tareas {

  _listado = {};

  get getListadoTareas() {
    const listado = [];
    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  };

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareaFromArray(tareas = []) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    });
  };

  listadoCompleto() {
    // leerDB();
    // console.log(leerDB());
    console.log('___________________________________');
    leerDB().forEach((tarea, index) => {
      console.log('|                                 |');
      const indx = `${colors.yellow(index + 1)}`;
      const { desc, completadaEn } = tarea;
      const estado = completadaEn == null
        ? `Pendiente`.red
        : `Completado`.green;
      console.log(`|  ${indx}. ${desc} :: ${estado}`);
    });
    console.log('|                                 |');
    console.log('-----------------------------------');

  };

  listarPendientescompletadas(completadas = true) {
    console.log('___________________________________');
    console.log('|                                 |');

    leerDB().forEach((tarea, index) => {
      const indx = `${colors.yellow(index + 1)}`;
      const { desc, completadaEn } = tarea;
      const estado = (completadaEn == null)
        ? `Pendiente`.red
        : `Completado`.green;
      if (completadaEn == null && !completadas) {
        // tareasNoCompletadas = desc;
        console.log(`|  ${indx}. ${desc} :: ${estado}`);
        console.log('|                                 |');
      } else if (completadaEn != null && completadas) {
        // tareasCompletadas = desc;
        console.log(`|  ${indx}. ${desc} :: ${estado}`);
        console.log('|                                 |');
      }
    });
    // console.log('|                                 |');
    console.log('-----------------------------------');
  }

}

export { Tareas };