import express from 'express';
import { registrarUsuario } from '../controllers/controllerRegistro.js';

export const router = express.Router();

router.post('/registro', registrarUsuario);
