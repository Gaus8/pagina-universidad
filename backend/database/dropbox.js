import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage }).fields([
  { name: 'file', maxCount: 1 },
  { name: 'slides', maxCount: 1 }
]);


const TOKEN = process.env.TOKEN_DROPBOX;
const dbx = new Dropbox({
  accessToken: TOKEN,
  fetch
});


export const uploadFile = async (ruta, file) => {
  const response = await dbx.filesUpload({
    path: ruta,
    contents: file.buffer,
    mode: { '.tag': 'overwrite' } // Sobreescribe si ya existe
  });

  try {
    const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({ path: response.result.path_lower });
    return sharedLink.result.url;
  } catch (error) {
    return {
      succes: false,
      message: 'Error al subir el archivo',
      error: error.message || error
    }
  }
};
export const deleteFileByLink = async (sharedLink) => {
  try {
    const metadata = await dbx.sharingGetSharedLinkMetadata({ url: sharedLink });
    const filePath = metadata.result.path_lower;
    console.log(filePath);
    const deleteResponse = await dbx.filesDeleteV2({ path: filePath });

    return {
      success: true,
      message: 'Archivo eliminado correctamente',
      data: deleteResponse.result
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error eliminando el archivo',
      error: error.message || error
    };
  }
};