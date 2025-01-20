import asyncHandler from 'express-async-handler';

export const registrarUsuario = asyncHandler(async (req, res) => {
  const { nombres, email, password } = req.body;
  if (!nombres || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos deben ser llenados' });
  }
  res.status(201).json({
    nombres,
    email,
    password
  });
  console.log(`Nombre: ${nombres} Email: ${email} Pass: ${password}`);
});

