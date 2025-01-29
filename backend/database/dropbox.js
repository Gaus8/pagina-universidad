import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage });


const TOKEN = process.env.TOKEN_DROPBOX;
const dbx = new Dropbox({
  accessToken: TOKEN,
  fetch
});


export const uploadFile = async (ruta, req) => {
  const response = await dbx.filesUpload({
    path: ruta,
    contents: req.file.buffer,
    mode: { '.tag': 'overwrite' } // Sobreescribe si ya existe
  });

  try {
    const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({ path: response.result.path_lower });
    return sharedLink.result.url;
  } catch (error) {
    console.log(error.error.error_summary);
  }
};
