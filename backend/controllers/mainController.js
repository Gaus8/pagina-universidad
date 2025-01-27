import jwt from 'jsonwebtoken';
import multer from 'multer';

export const validateToken = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).send('ACCESS NO AUTHORIZED');
  }
  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN);
    res.render('main', { data });
  } catch (error) {
    console.log(error);
  }
};


 // Carpeta donde se guardarán los archivos

