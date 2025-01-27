import { Dropbox } from 'dropbox';
import 'dotenv/config';
import fs from 'fs';
import fetch from 'node-fetch';
const TOKEN = process.env.TOKEN_DROPBOX;

const dbx = new Dropbox({
  accessToken: TOKEN,
  fetch
});

export const findDocuments = async (ruta) => {
  try {
    const response = await dbx.filesListFolder({
      path: ruta});
    if (response.result.entries) {
      response.result.entries.forEach(entry => {
        console.log(entry.name);
      })
    }
  } catch (error) {
    console.log(error);
  }
};
