import { validateLoginUser } from '../esquema/validateString.js';
import User from '../esquema/userSchema.js';
import bcrypt from 'bcrypt';

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

  const findUser = await User.findOne({ email });
  console.log(findUser);

  const checkPassword = await bcrypt.compare(password, findUser.password);

  if (findUser && checkPassword) {
    res.status(200).json({
      status: 'success',
      message: 'Ingreso Exitoso'
    });
  }else{
    res.status(404).json({
      status:'error',
      error: 'Email o contraseña incorrectos'
    })
  }
};
