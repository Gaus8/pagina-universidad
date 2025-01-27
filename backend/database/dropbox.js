import { Dropbox } from 'dropbox';
import 'dotenv/config';
import fs from 'fs';
import fetch from 'node-fetch';
const TOKEN = process.env.TOKEN_DROPBOX;

export class Drop {
  constructor () {
    this.dbx = new Dropbox({
      accessToken: TOKEN,
      fetch
    });
  }

  // Descargar Archivos directamente
  async descargar (rutaDropbox) {
    try {
      const archivo = await this.dbx.filesDownload({ path: rutaDropbox });
      return archivo.result.fileBinary; // Devolver el archivo binario
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      throw error;
    }
  }
}



//   // Encontrar archivos en dropbox, de acuerdo a la carpeta
//   findDocuments = async (ruta) => {
//     try {
//       const response = await dbx.filesListFolder({ path: ruta });
//       if (response.result.entries) {
//         response.result.entries.forEach(entry => {
//           console.log(entry.name);
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   uploadFile = async (rutaLocal, rutaDropbox) => {
//     try {
//       // Leer el archivo desde el sistema local
//       const archivo = fs.readFileSync(rutaLocal);

//       // Subir el archivo a Dropbox
//       const response = await dbx.filesUpload({
//         path: rutaDropbox, // Ruta destino en Dropbox, debe empezar con '/'
//         contents: archivo
//       });

//       console.log('Archivo subido con éxito:', response.result);
//     } catch (error) {
//       console.error('Error subiendo archivo:', error);
//     }
//   };
// }


