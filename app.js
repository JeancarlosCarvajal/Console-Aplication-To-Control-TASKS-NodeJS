import 'colors';
import { guardarDB, leerDB } from './helpers/guardar_archivo.js';
// const { mostrarMenu, pausa } = require('./helpers/mensajes') // for practices
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar } from './helpers/inquirer.js';
import { Tarea } from './models/tarea.js';
import { Tareas } from './models/tareas.js';
console.clear();

const main = async () => {
  let opt = '';
  const tareas = new Tareas();
  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareaFromArray(tareasDB);
  }
  // await pausa();

  do {

    opt = await inquirerMenu();
    // console.log({ opt });
    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion: ');
        tareas.crearTarea(desc);
        // console.log(desc);
        break;
      case '2':
        tareas.listadoCompleto();
        // console.log(tareas.getTaskListado);
        break;
      case '3': // Tareas Terminadas
        tareas.listarPendientescompletadas(true);
        break;
      case '4': // Tareas Pendientes
        tareas.listarPendientescompletadas(false);
        break;
      case '5': // Completar tareas

        break;
      case '6':// Borrar tareas
        const id = await listadoTareasBorrar(tareas.getListadoTareas);
        if (id != '0') {
          const isOkDelete = await confirmar('Estas Seguro?');
          if (isOkDelete) {
            tareas.borrarTarea(id);
            console.log('Tarea Borrada Correctamente');
          };
        }
        // console.log({ isOkDelete });
        break;
      default:
        break;
    }
    guardarDB(tareas.getListadoTareas);
    await pausa();
  } while (opt !== '0');

};

main();