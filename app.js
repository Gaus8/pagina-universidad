import express from 'express';
import { router } from './backend/routes/userRoutes.js';
import 'dotenv/config';
import { connectionDb } from './backend/database/dbConnection.js';

connectionDb();

const app = express();

app.use(express.json());
app.use('/inicio', router);

app.use(express.static('public'));

// Redirigir a /inicio/index.html si se accede a la raíz
app.get('/', (req, res) => {
  res.redirect('/inicio/index.html');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
  