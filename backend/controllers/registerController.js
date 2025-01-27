
import { validateRegisterUser } from '../esquema/validateString.js';
import bcrypt from 'bcrypt';

import User from '../esquema/userSchema.js';

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Todos los campos deben ser llenados'
    });
  }

  const validar = validateRegisterUser(req.body);
  if (validar.error) {
    return res.status(400).json({
      status: 'error',
      error: JSON.parse(validar.error.message)
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(validar.data.password, 10);
    const newUser = {
      name: validar.data.name,
      email: validar.data.email,
      password: hashedPassword,
      role: role || 'student' 
    };

    const sendMessage = await createUser(newUser);

    res.status(201).json({
      status: 'success',
      message: sendMessage,
      name: newUser.role
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

const createUser = async (user) => {
  const findUser = await User.findOne({ email: user.email });
  if (findUser) {
    throw new Error('ERROR: CORREO YA REGISTRADO!');
  }
  const create = await User.create(user);
  if (create) {
    return 'USUARIO REGISTRADO EXITOSAMENTE';
  }
};

