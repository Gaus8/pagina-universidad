import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(403).json({ message: 'Ingreso Invalido, inicie sesión' });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = data; // Adjuntar los datos del usuario a req
    next(); // Pasar al siguiente middleware o a la ruta final
  } catch (error) {
    console.error('Error de autenticación:', error);
    return res.status(403).json({ message: 'ACCESS NO AUTHORIZED' });
  }
};
