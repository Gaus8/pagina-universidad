import asyncHandler from 'express-async-handler';
import { validateUser } from '../esquema/validateString.js';
import bcrypt from 'bcrypt';

export const registrarUsuario = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos deben ser llenados' });
  }

  const validar = validateUser(req.body);
  if (validar.error) {
    return res.status(400).json({ error: JSON.parse(validar.error.message) });
  }

  const hashedPassword = await bcrypt.hash(validar.data.password, 10);
  const newUser = {
    name: validar.data.name,
    email: validar.data.email,
    password: hashedPassword
  };

  res.status(201).json({
    newUser
  });
});

