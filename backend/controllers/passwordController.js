import User from '../schema/userSchema.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

export const changePassword = async (req, res) => {
  const token = req.cookies.access_token;
  const { password } = req.body;

  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN);
    const { email } = data;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    if (await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'La contraseña es igual a la anterior' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const update = await User.updateOne(
      { email }, { $set: { password: hashedPassword } }
    );
    if (update.modifiedCount > 0) {
      return res.status(200).json({ message: 'Contaseña actualizada' });
    } else {
      return res.status(400).json({ message: 'Fallo al actualizar la contraseña' });
    }
  } catch (error) {
    res.status(400).json({
      message: 'Error!, Usuario no encontrado'
    });
  }
};

export const sendEmailPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Correo no registrado' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 1000000; 
  await user.save();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // Usa 587 si prefieres STARTTLS
    secure: true, // true para 465, false para 587
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD_EMAIL
    }
  });
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001';

  const mailOptions = {
    to: user.email,
    subject: 'Recuperación de contraseña',
    html: `
      <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
      <a href="${FRONTEND_URL}/reset_password?token=${resetToken}">Restablecer contraseña</a>
      <p>Este enlace expirará en 10 minutos</p>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Correo enviado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
};

export const resetPassword = async (req, res) => {
  const { password, token } = req.body;

  try {
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Token Invalido' });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: 'El token ha expirado, solicita uno nuevo' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const update = await User.updateOne(
      { resetPasswordToken: token },
      {
        $set: { password: hashedPassword },
        $unset: { resetPasswordToken: '', resetPasswordExpires: '' } // Elimina los campos del token
      }
    );
    if (update.modifiedCount > 0) {
      return res.status(200).json({ message: 'Contaseña actualizada' });
    } else {
      return res.status(400).json({ message: 'Fallo al actualizar la contraseña' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Fallo al actualizar la contraseña' });
  }
};
