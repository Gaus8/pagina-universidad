import nodemailer from 'nodemailer';
import 'dotenv/config';

const password = process.env.PASSWORD_EMAIL;
const email = process.env.EMAIL ; 

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Usa 587 si prefieres STARTTLS
  secure: true, // true para 465, false para 587
  auth: {
    user: email,
    pass: password
  }
});


async function main() {
  try {
    const info = await transporter.sendMail({
      from: '"Tu Nombre" <proyectosdegestionubate@gmail.com>', 
      to: 'usg200208@gmail.com', 
      subject: 'Prueba desde Node.js 🚀', 
      text: '¡Hola! Este es un mensaje enviado desde Nodemailer con Gmail.', 
      html: '<b>¡Hola! Este es un mensaje enviado desde Nodemailer con Gmail.</b>' 
    });

    console.log('✅ Correo enviado con éxito:', info.messageId);
  } catch (error) {
    console.error('❌ Error enviando el correo:', error);
  }
}

main();