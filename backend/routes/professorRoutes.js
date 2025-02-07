import express from 'express';
import { validateToken } from '../middleware/validateToken.js';
import { renderRoutes } from '../controllers/renderRoutes.js';

export const routerProffesor = express.Router();

routerProffesor.get('/main', validateToken, renderRoutes('professor'));
