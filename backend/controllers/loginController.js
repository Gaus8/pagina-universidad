import { validateLoginUser } from '../esquema/validateString.js';
import User from '../esquema/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Todos los campos deben ser llenados'
    });
  }
  validateLogin(req, res);
};

const validateLogin = async (req, res) => {
  const validate = validateLoginUser(req.body);
  if (validate.error) {
    return res.status(400).json({
      status: 'error',
      error: JSON.parse(validate.error.message)
    });
  }
  const { email, password } = validate.data;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'EMAIL NO REGISTRADO'
    });
  }
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(404).json({
      status: 'error',
      message: 'Contraseña incorrecta'
    });
  }

  const token = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_TOKEN,
  {
    expiresIn: '10m'
  });

  console.log(token);
  res.cookie('access_token', token, {
    httpOnly: true,
    sameSite: 'strict'
  })
    .status(200).json({
      status: 'success',
      message: 'Ingreso Exitoso',
      name: user.name
    
    });
};

