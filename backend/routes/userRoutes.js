import express from 'express';
import { registrarUsuario } from '../controllers/controllerUsuarios.js';

 export const router = express.Router();

router.post('/registro',registrarUsuario)
