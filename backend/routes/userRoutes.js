import express from 'express';
import { registerUser } from '../controllers/controllerRegistro.js';

export const router = express.Router();

router.post('/registro', registerUser);
