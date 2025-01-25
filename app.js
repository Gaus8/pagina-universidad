import express from 'express';
import { routerRegister } from './backend/routes/registerRoutes.js';
import { routerLogin } from './backend/routes/loginRoutes.js';
import 'dotenv/config';
import { connectionDb } from './backend/database/dbConnection.js';
import { routerMainPage } from './backend/routes/mainRoutes.js';
import { routerProjects } from './backend/routes/proyectoRoutes.js';
connectionDb();

const app = express();

app.use(express.json());
app.use('/', routerRegister);
app.use('/', routerLogin);
app.use('/', routerMainPage);
app.use('/', routerProjects);
app.use(express.static('public'));
app.set('view engine', 'ejs');



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
  