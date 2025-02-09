import User from '../schema/userSchema.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const changePassword = async (req, res) => {
  const token = req.cookies.access_token;
  const { password } = req.body;
  console.log('PASSWORD:' + password);

  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN);
    const { email } = data;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    if (await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'La contraseña no puede ser igual' });
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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Correo no registrado' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
  await user.save();

  
  const password = process.env.PASSWORD_EMAIL;
  const emailUser = process.env.EMAIL; 

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // Usa 587 si prefieres STARTTLS
    secure: true, // true para 465, false para 587
    auth: {
      user: emailUser,
      pass: password
    }
  });

  const mailOptions = {
    to: user.email,
    subject: 'Recuperación de contraseña',
    html: `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
           <a href="http://localhost:3000/reset-password?token=${resetToken}">Restablecer contraseña</a>`
  };


  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Correo enviado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
};
