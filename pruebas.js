// import { Dropbox } from 'dropbox';
// import 'dotenv/config';
// import fs from 'fs';
// import fetch from 'node-fetch';
// const TOKEN = process.env.TOKEN_DROPBOX;

// const dbx = new Dropbox({
//   accessToken: TOKEN,
//   fetch
// });

// export class Drop {
// // Asegúrate de inicializar Dropbox con tu token

//   async descargar (rutaDropbox, rutaLocal) {
//     try {
//       const archivo = await dbx.filesDownload({ path: rutaDropbox });

//       // Convertir el archivo a Buffer y guardarlo
//       const contenido = archivo.result.fileBinary;
//       fs.writeFileSync(rutaLocal, contenido, 'binary'); // Guardar en formato binario

//       console.log(`Archivo descargado y guardado en: ${rutaLocal}`);
//     } catch (error) {
//       console.error('Error al descargar el archivo:', error);
//     }
//   }
// }

// async function subirArchivo (rutaLocal, rutaDropbox) {
//   try {
//     // Leer el archivo desde el sistema local
//     const archivo = fs.readFileSync(rutaLocal);

//     // Subir el archivo a Dropbox
//     const response = await dbx.filesUpload({
//       path: rutaDropbox, // Ruta destino en Dropbox, debe empezar con '/'
//       contents: archivo
//     });

//     console.log('Archivo subido con éxito:', response.result);
//   } catch (error) {
//     console.error('Error subiendo archivo:', error);
//   }
// }

// // Ejemplo de uso
// const rutaLocal = 'ha.pdf';
// const rutaDropbox = '/ciclo3/haha.pdf'; // Ruta en Dropbox

// subirArchivo(rutaLocal, rutaDropbox);

// ELIMINAR ARCHIVOS
// async function eliminarArchivo (ruta) {
//   try {
//     const archivo = await dbx.filesDelete({
//       path: ruta
//     });

//     console.log(archivo);
//   } catch (error) {
//     console.log(error);
//   }
// }

// eliminarArchivo('/ciclo3/ha.pdf');

// DESCARGAR ARCHIVO





