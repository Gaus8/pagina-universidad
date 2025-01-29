// import { Dropbox } from 'dropbox';
// import 'dotenv/config';
// import fs from 'fs';
// import fetch from 'node-fetch';
// const TOKEN = process.env.TOKEN_DROPBOX;

// export class Drop {
//   constructor () {
//     this.dbx = new Dropbox({
//       accessToken: TOKEN,
//       fetch
//     });
//   }

//   async subirArchivo (rutaLocal, rutaDropbox) {
//     try {
//       // Leer el archivo desde el sistema local
//       const archivo = fs.readFileSync(rutaLocal);

//       // Subir el archivo a Dropbox
//       const response = await this.dbx.filesUpload({
//         path: rutaDropbox, // Ruta destino en Dropbox, debe empezar con '/'
//         contents: archivo
//       });

//       console.log('Archivo subido con éxito:', response.result);
//     } catch (error) {
//       console.error('Error subiendo archivo:', error);
//     }
//   }
// }


// //   // Descargar Archivos directamente
// //   async descargar (rutaDropbox) {
// //     try {
// //       const archivo = await this.dbx.filesDownload({ path: rutaDropbox });
// //       return archivo.result.fileBinary; // Devolver el archivo binario
// //     } catch (error) {
// //       console.error('Error al descargar el archivo:', error);
// //       throw error;
// //     }
// //   }
// // }



// //   // Encontrar archivos en dropbox, de acuerdo a la carpeta
// //   findDocuments = async (ruta) => {
// //     try {
// //       const response = await dbx.filesListFolder({ path: ruta });
// //       if (response.result.entries) {
// //         response.result.entries.forEach(entry => {
// //           console.log(entry.name);
// //         });
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   uploadFile = async (rutaLocal, rutaDropbox) => {
// //     try {
// //       // Leer el archivo desde el sistema local
// //       const archivo = fs.readFileSync(rutaLocal);

// //       // Subir el archivo a Dropbox
// //       const response = await dbx.filesUpload({
// //         path: rutaDropbox, // Ruta destino en Dropbox, debe empezar con '/'
// //         contents: archivo
// //       });

// //       console.log('Archivo subido con éxito:', response.result);
// //     } catch (error) {
// //       console.error('Error subiendo archivo:', error);
// //     }
// //   };
// // }





// // import { Dropbox } from 'dropbox';
// // import 'dotenv/config';
// // import fs from 'fs';
// // import fetch from 'node-fetch';
// // const TOKEN = process.env.TOKEN_DROPBOX;

// // const dbx = new Dropbox({
// //   accessToken: TOKEN,
// //   fetch
// // });

// // // export class Drop {
// // // // Asegúrate de inicializar Dropbox con tu token

// // //   async descargar (rutaDropbox, rutaLocal) {
// // //     try {
// // //       const archivo = await dbx.filesDownload({ path: rutaDropbox });

// // //       // Convertir el archivo a Buffer y guardarlo
// // //       const contenido = archivo.result.fileBinary;
// // //       fs.writeFileSync(rutaLocal, contenido, 'binary'); // Guardar en formato binario

// // //       console.log(`Archivo descargado y guardado en: ${rutaLocal}`);
// // //     } catch (error) {
// // //       console.error('Error al descargar el archivo:', error);
// // //     }
// // //   }
// // // }



// // // ELIMINAR ARCHIVOS
// // // async function eliminarArchivo (ruta) {
// // //   try {
// // //     const archivo = await dbx.filesDelete({
// // //       path: ruta
// // //     });

// // //     console.log(archivo);
// // //   } catch (error) {
// // //     console.log(error);
// // //   }
// // // }

// // // eliminarArchivo('/ciclo3/ha.pdf');

// // // DESCARGAR ARCHIVO







// //// function saveDoc (file) {
// //   const newPath = `uploads/${file.originalname}`;
// //   fs.renameSync(file.path, newPath);
// //   return newPath;
// // }
