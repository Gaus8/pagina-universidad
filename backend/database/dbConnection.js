import mongoose from 'mongoose';

export const connectionDb = async () => {
  try {
    const connectDb = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      'Connection established',
      connectDb.connection.name,
      connectDb.connection.host);
  } catch (err) {
    console.log('Fallo en la conexion: ' + err);
  };
};
