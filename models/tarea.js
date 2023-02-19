import { v4 as uuidv4 } from 'uuid';


class Tarea {
  id = '';
  desc = '';
  completadaEn = null;

  constructor(desc) {
    this.id = uuidv4();
    this.desc = desc;
    this.completadaEn = null;
  }
}

export { Tarea };


// this.getListadoTareas.forEach(tarea => {
//   const tareaAll = this._listado[tarea.id];
//   if (!ids.includes(tarea.id)) {
//     tareaAll.completadaEn = null;
//   }
// });