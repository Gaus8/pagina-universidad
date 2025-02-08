import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { routerRegister } from './backend/routes/registerRoutes.js';
import { routerLogin } from './backend/routes/loginRoutes.js';
import { connectionDb } from './backend/database/dbConnection.js';
import { routerMainPage } from './backend/routes/studentsRoutes.js';
import { routerProffesor } from './backend/routes/professorRoutes.js';
connectionDb();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use('/register', routerRegister);
app.use('/', routerLogin);
app.use('/students', routerMainPage);
app.use('/professor', routerProffesor);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.post('/logout', (req, res) => {
  res.clearCookie('access_token', { path: '/' });
  res.status(200).json({ message: 'Sesión cerrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

